import os
import glob
import re
import time
import requests  # <--- New Standard Library
from dotenv import load_dotenv
from langchain_text_splitters import RecursiveCharacterTextSplitter
from app.database import SessionLocal, engine
from app.models import CodeSnippet, Base

# --- 1. SETUP ---
load_dotenv()

raw_key = os.getenv("GEMINI_API_KEY", "")
clean_key = re.sub(r'[^a-zA-Z0-9_\-]', '', raw_key)

if not clean_key:
    print("❌ Error: GEMINI_API_KEY not found.")
    exit()

print(f"🔑 Key Loaded: {clean_key[:5]}... (Using Direct HTTP Mode)")

# --- 2. THE DIRECT API FUNCTION ---
def get_embedding_direct(text):
    """Calls Gemini REST API directly to bypass SDK authentication bugs"""
    url = f"https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key={clean_key}"
    
    payload = {
        "model": "models/text-embedding-004",
        "content": {
            "parts": [{"text": text}]
        }
    }
    
    try:
        # Send POST request
        response = requests.post(url, json=payload, timeout=10)
        
        if response.status_code != 200:
            print(f"   ⚠️ API Error {response.status_code}: {response.text[:200]}")
            return None
            
        data = response.json()
        # Extract the vector list
        return data["embedding"]["values"]
        
    except Exception as e:
        print(f"   ⚠️ Connection Error: {e}")
        return None

def ingest_files():
    print("🚀 Starting Ingestion to Neon DB...")
    
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
                    # USE THE NEW DIRECT FUNCTION
                    vector = get_embedding_direct(chunk_text)
                    
                    if vector:
                        snippet = CodeSnippet(
                            file_path=file_path,
                            content=chunk_text,
                            embedding=vector
                        )
                        session.add(snippet)
                        count += 1
                        # Sleep slightly to be nice to the API
                        time.sleep(0.2)
                    else:
                        print(f"      ❌ Failed to embed chunk in {file_path}")

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