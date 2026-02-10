import os
import re
import json
import requests
from dotenv import load_dotenv
from pathlib import Path
from sqlalchemy import select
from app.database import SessionLocal
from app.models import CodeSnippet

# --- 1. ROBUST SETUP ---
# Force load .env from the backend root directory
# (This fixes the "Key not found" error when running via uvicorn)
env_path = Path(__file__).resolve().parent.parent / '.env'
load_dotenv(dotenv_path=env_path, override=True)

raw_key = os.getenv("GEMINI_API_KEY", "")
clean_key = re.sub(r'[^a-zA-Z0-9_\-]', '', raw_key)

if not clean_key:
    print("❌ ERROR: GEMINI_API_KEY not found in app/gemini_ai.py!")

# --- 2. DIRECT HTTP FUNCTIONS ---

def get_embedding_direct(text: str):
    """Generates vector using gemini-embedding-001 (Forced to 768 dim)"""
    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent"
    
    headers = {
        "Content-Type": "application/json",
        "x-goog-api-key": clean_key
    }
    
    payload = {
        "model": "models/gemini-embedding-001",
        "content": {"parts": [{"text": text}]},
        "outputDimensionality": 768
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload, timeout=5)
        if response.status_code == 200:
            return response.json()["embedding"]["values"]
        else:
            print(f"⚠️ Embedding API Error: {response.text}")
            return None
    except Exception as e:
        print(f"⚠️ Embedding Connection Error: {e}")
        return None
model_name = "gemini-2.0-flash"

def generate_chat_response(prompt: str):
    """Generates chat response using Gemini 1.5 Flash via Direct HTTP"""
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent"
    
    headers = {
        "Content-Type": "application/json",
        "x-goog-api-key": clean_key
    }
    
    payload = {
        "contents": [{
            "parts": [{"text": prompt}]
        }],
        "generationConfig": {
            "temperature": 0.2,
            "responseMimeType": "application/json" # Request JSON directly
        }
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload, timeout=30)
        
        if response.status_code != 200:
            print(f"❌ Chat API Error {response.status_code}: {response.text}")
            return None
            
        data = response.json()
        # Extract text from the response
        return data["candidates"][0]["content"]["parts"][0]["text"]
        
    except Exception as e:
        print(f"❌ Chat Connection Error: {e}")
        return None

# --- 3. RETRIEVAL LOGIC ---
def get_relevant_context(diff_text: str) -> str:
    session = SessionLocal()
    try:
        query_vector = get_embedding_direct(diff_text[:1000])
        if not query_vector: return ""

        results = session.scalars(
            select(CodeSnippet)
            .order_by(CodeSnippet.embedding.cosine_distance(query_vector))
            .limit(3)
        ).all()
        
        if not results: return ""

        return "\n".join([f"--- FROM {r.file_path} ---\n{r.content}\n" for r in results])
    except Exception as e:
        print(f"⚠️ Vector Search Failed: {e}")
        return ""
    finally:
        session.close()

# --- 4. MAIN ANALYSIS FUNCTION ---
async def analyze_code(diff: str, files: list = None) -> dict:
    
    # A. Get Context
    related_code = get_relevant_context(diff)
    
    # B. Build Prompt
    files_list = ", ".join([f["filename"] for f in files]) if files else "Unknown"
    
    prompt = f"""
    You are a Senior Code Reviewer.
    
    ### 🧠 CONTEXT:
    {related_code if related_code else "No specific context found."}
    
    ### 📝 INSTRUCTIONS:
    Analyze the diff below for bugs, security, and style.
    
    ### 📂 DIFF ({files_list}):
    {diff[:50000]}
    
    Return JSON:
    {{
      "issues": [
        {{ "severity": "high|medium|low", "type": "bug|security|style", "line": 0, "message": "...", "suggestion": "..." }}
      ],
      "summary": "...",
      "score": 0-10
    }}
    """

    try:
        # C. Call Gemini via HTTP
        json_text = generate_chat_response(prompt)
        
        if not json_text:
             return {"issues": [], "summary": "AI API Connection Failed", "score": 5}

        # D. Clean & Parse JSON
        return json.loads(json_text)

    except Exception as e:
        print(f"❌ Analysis Parsing Failed: {e}")
        return {
            "issues": [],
            "summary": f"Error parsing AI response: {str(e)[:100]}",
            "score": 5
        }

def format_review_comment(analysis: dict) -> str:
    comment = "## 🤖 DevFlow AI Code Review\n\n"
    comment += f"**Summary:** {analysis.get('summary', 'Code analyzed')}\n\n"
    comment += f"**Quality Score:** {analysis.get('score', 5)}/10\n\n"
    
    for severity in ["high", "medium", "low"]:
        issues = [i for i in analysis.get("issues", []) if i["severity"] == severity]
        if issues:
            icon = {"high": "⚠️", "medium": "🔸", "low": "💡"}[severity]
            comment += f"### {icon} {severity.title()} Priority\n"
            for issue in issues[:3]:
                comment += f"- **{issue.get('type', 'issue')}**: {issue['message']}\n"
                if issue.get('suggestion'):
                    comment += f"  - *Fix:* `{issue['suggestion']}`\n"
            comment += "\n"
            
    return comment