import os
from dotenv import load_dotenv

# Try to load the environment
load_dotenv()

key = os.getenv("GEMINI_API_KEY")

print(f"Current Working Directory: {os.getcwd()}")
print(f"Value of GEMINI_API_KEY: {key}")

if key is None:
    print("❌ FAILURE: Python cannot find the key.")
elif key == "":
    print("❌ FAILURE: The key is found but it is empty.")
else:
    print("✅ SUCCESS: Key loaded! (Starts with: " + key[:5] + "...)")