import os
from dotenv import load_dotenv
from google import genai
from pathlib import Path

# --- 1. LOAD ENV (Same as before) ---
env_path = Path(__file__).parent / '.env'
load_dotenv(dotenv_path=env_path, override=True)
api_key = os.getenv("GEMINI_API_KEY")

try:
    client = genai.Client(api_key=api_key)
    print(f"🔍 Listing models using key: {api_key[:5]}...\n")

    # --- 2. LIST ALL MODELS (No filtering to avoid errors) ---
    count = 0
    for m in client.models.list():
        # Only print models that look like "gemini" to keep the list clean
        if "gemini" in m.name:
            print(f"✅ Found: {m.name}")
            print(f"   Display Name: {m.display_name}")
            count += 1

    if count == 0:
        print("⚠️ No 'gemini' models found. Printing EVERYTHING:")
        for m in client.models.list():
            print(f" - {m.name}")

except Exception as e:
    print(f"❌ Error: {e}")