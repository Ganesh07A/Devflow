import os
import re
import requests
from dotenv import load_dotenv
from pathlib import Path
from sqlalchemy import select
from app.database import SessionLocal
from app.models import CodeSnippet

# --- 1. ROBUST SETUP (The Fix) ---
# Force load .env from the current directory
env_path = Path(__file__).parent / '.env'
load_dotenv(dotenv_path=env_path, override=True)

raw_key = os.getenv("GEMINI_API_KEY", "")
clean_key = re.sub(r'[^a-zA-Z0-9_\-]', '', raw_key)

if not clean_key:
    print("❌ Error: GEMINI_API_KEY not found in .env")
    exit()

print(f"🔑 Key Loaded: {clean_key[:5]}... (Length: {len(clean_key)})")

# --- 2. SAME EMBEDDING FUNCTION ---
def get_embedding(text):
    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent"
    
    headers = {
        "Content-Type": "application/json",
        "x-goog-api-key": clean_key
    }
    
    payload = {
        "model": "models/gemini-embedding-001",
        "content": {"parts": [{"text": text}]},
        "outputDimensionality": 768 # <--- MUST MATCH INGESTION
    }
    
    try:
        resp = requests.post(url, headers=headers, json=payload, timeout=10)
        if resp.status_code == 200:
            return resp.json()["embedding"]["values"]
        
        print(f"❌ API Error {resp.status_code}: {resp.text}")
        return None
    except Exception as e:
        print(f"❌ Connection Error: {e}")
        return None

# --- 3. THE SEARCH TEST ---
def test_memory():
    query = "How do we handle PR webhooks?"
    print(f"🧠 Asking the database: '{query}'...")
    
    vector = get_embedding(query)
    if not vector: return
    
    session = SessionLocal()
    try:
        # Search for top 2 matches
        results = session.scalars(
            select(CodeSnippet)
            .order_by(CodeSnippet.embedding.cosine_distance(vector))
            .limit(2)
        ).all()
        
        if not results:
            print("❌ No matches found! (Database might be empty)")
        else:
            print(f"\n✅ SUCCESS! Found {len(results)} matches:\n")
            for i, r in enumerate(results):
                print(f"--- Match {i+1}: {r.file_path} ---")
                # Print first 100 chars of code to verify
                preview = r.content[:100].replace("\n", " ") 
                print(f"Code: {preview}...\n")
                
    except Exception as e:
        print(f"❌ Database Error: {e}")
    finally:
        session.close()

if __name__ == "__main__":
    test_memory()