import os
import re
import requests
from dotenv import load_dotenv
from pathlib import Path

# Load API Key
# Load API Key
env_path = Path(__file__).parent / '.env'
print(f"Checking for .env at: {env_path.resolve()}")
if env_path.exists():
    load_dotenv(dotenv_path=env_path, override=True)
else:
    print(" .env file does not exist!")

raw_key = os.getenv("GEMINI_API_KEY", "")
clean_key = re.sub(r'[^a-zA-Z0-9_\-]', '', raw_key)

url = f"https://generativelanguage.googleapis.com/v1beta/models?key={clean_key}"

try:
    response = requests.get(url)
    if response.status_code == 200:
        models = response.json().get('models', [])
        print(f"✅ Found {len(models)} models:")
        for m in models:
            if "generateContent" in m.get("supportedGenerationMethods", []):
                print(f" - {m['name']}")
    else:
        print(f"❌ Error {response.status_code}: {response.text}")
except Exception as e:
    print(f"❌ Connection Error: {e}")