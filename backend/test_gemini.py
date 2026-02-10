import os
import re
import time
from pathlib import Path
from dotenv import load_dotenv
from google import genai
from google.api_core.exceptions import ResourceExhausted

# --- 1. SETUP ---
env_path = Path(__file__).parent / '.env'
load_dotenv(dotenv_path=env_path, override=True)

raw_key = os.getenv("GEMINI_API_KEY", "")
clean_key = re.sub(r'[^a-zA-Z0-9_\-]', '', raw_key)

# --- 2. USE THE GENERIC ALIAS ---
# This is the safest bet from your list. 
# It usually points to the most available model.
MODEL_ID = 'gemini-flash-latest' 

try:
    print(f"🔄 Connecting to {MODEL_ID}...")
    client = genai.Client(api_key=clean_key)
    
    response = client.models.generate_content(
        model=MODEL_ID, 
        contents='Hello! Just one word reply please.'
    )
    
    print(f"\n✅ SUCCESS! Response:\n{response.text}")

except ResourceExhausted:
    print("\n⚠️ QUOTA BLOCKED.")
    print("   The API is saying your Free Tier limit is 0 for this model.")
    print("   To fix this, you likely need to add a billing card at: https://aistudio.google.com/")
except Exception as e:
    print(f"\n❌ Error: {e}")