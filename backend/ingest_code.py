import os
import glob
import re
import time
import requests
from dotenv import load_dotenv
from pathlib import Path
from langchain_text_splitters import RecursiveCharacterTextSplitter
from app.database import SessionLocal, engine
from app.models import CodeSnippet, Base

# --- 1. SETUP ---
env_path = Path(__file__).parent / '.env'
load_dotenv(dotenv_path=env_path, override=True)

raw_key = os.getenv("GEMINI_API_KEY", "")
clean_key = re.sub(r'[^a-zA-Z0-9_\-]', '', raw_key)

if not clean_key:
    print("❌ Error: GEMINI_API_KEY not found in .env")
    exit()

print(f"🔑 Key Loaded: {clean_key[:5]}... (Length: {len(clean_key)})")

# --- 2. FIXED API FUNCTION (With Output Dimensionality) ---
def get_embedding_headers(text):
    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent"
    
    headers = {
        "Content-Type": "application/json",
        "x-goog-api-key": clean_key
    }
    
    payload = {
        "model": "models/gemini-embedding-001",
        "content": {
            "parts": [{"text": text}]
        },
        "outputDimensionality": 768  # <--- THIS FIXES THE CRASH
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload, timeout=10)
        
        if response.status_code != 200:
            print(f"   ⚠️ API Error {response.status_code}: {response.text[:200]}")
            return None
            
        data = response.json()
        return data["embedding"]["values"]
        
    except Exception as e:
        print(f"   ⚠️ Connection Error: {e}")
        return None

def ingest_files():
    print("🚀 Starting Ingestion to Neon DB...")
    
    # Check connection first
    print("   Testing API connection...")
    test_vec = get_embedding_headers("test")
    if not test_vec:
        print("❌ Critical: API Test Failed. Aborting.")
        return
    
    # Check dimensions
    if len(test_vec) != 768:
        print(f"❌ Error: Model returned {len(test_vec)} dimensions, expected 768.")
        return
        
    print("   ✅ API Connection successful (Dimensions: 768)!")

    Base.metadata.create_all(bind=engine)
    session = SessionLocal()
    
    try:
        print("🧹 Clearing old code snippets...")
        session.query(CodeSnippet).delete()
        session.commit()

        files = glob.glob("**/*.py", recursive=True)
        print(f"📂 Found {len(files)} files to process.")

        splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=100,
            separators=["\nclass ", "\ndef ", "\n\n", "\n"]
        )

        count = 0
        for file_path in files:
            if any(x in file_path for x in ["venv", "alembic", "ingest_code.py", "__init__.py"]):
                continue

            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
                
                if not content.strip(): continue

                chunks = splitter.split_text(content)
                print(f"   Processing: {file_path} ({len(chunks)} chunks)...")
                
                for chunk_text in chunks:
                    vector = get_embedding_headers(chunk_text)
                    
                    if vector:
                        snippet = CodeSnippet(
                            file_path=file_path,
                            content=chunk_text,
                            embedding=vector
                        )
                        session.add(snippet)
                        count += 1
                        time.sleep(0.2)
                    else:
                        print(f"      ❌ Failed chunk in {file_path}")

            except Exception as e:
                print(f"   ⚠️ File Error {file_path}: {e}")

        session.commit()
        print(f"\n✅ SUCCESS! Uploaded {count} code chunks to Neon PostgreSQL.")

    except Exception as e:
        print(f"❌ Critical Error: {e}")
        session.rollback()
    finally:
        session.close()

if __name__ == "__main__":
    ingest_files()