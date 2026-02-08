from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

try:
    client = genai.Client(api_key=api_key)
    
    # CHANGED: 'gemini-2.5' -> 'gemini-1.5-flash'
    response = client.models.generate_content(
        model='gemini-1.5-flash', 
        contents='Say hello!'
    )
    
    print("✅ Gemini works!")
    print(f"Response: {response.text}")

except Exception as e:
    print(f"❌ Error: {e}")