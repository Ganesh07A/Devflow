from google import genai
from google.genai import types
from app.config import settings
import json

# Configure with new SDK
client = genai.Client(api_key=settings.GEMINI_API_KEY)

async def analyze_code(diff: str, files: list = None) -> dict:
    """Send code diff to Gemini for analysis"""
    
    # Prepare context
    files_context = ""
    if files:
        file_names = [f["filename"] for f in files[:10]]
        files_context = f"\n\nFiles changed: {', '.join(file_names)}"
    
    prompt = f"""Analyze this code diff and identify issues:

1. **Security vulnerabilities** (SQL injection, XSS, exposed secrets)
2. **Bug-prone patterns** (null checks, race conditions, error handling)
3. **Best practice violations** (naming, code structure)
4. **Performance issues** (N+1 queries, inefficient loops)

{files_context}

Return JSON with this exact structure:
{{
  "issues": [
    {{
      "severity": "high|medium|low",
      "type": "security|bug|style|performance",
      "line": 0,
      "message": "Brief description",
      "suggestion": "How to fix"
    }}
  ],
  "summary": "Overall assessment in 1-2 sentences",
  "score": 0-10
}}

Code diff:
```diff
{diff[:8000]}
```

Return ONLY valid JSON."""

    try:
        response = client.models.generate_content(
            model='gemini-2.0-flash-exp',
            contents=prompt
        )
        
        response_text = response.text
        # Clean markdown formatting
        response_text = response_text.replace("```json", "").replace("```", "").strip()
        
        return json.loads(response_text)
    
    except Exception as e:
        print(f"❌ Gemini analysis error: {e}")
        return {
            "issues": [],
            "summary": "Error analyzing code - please review manually",
            "score": 5
        }


def format_review_comment(analysis: dict) -> str:
    """Format AI analysis as GitHub comment"""
    
    comment = "## 🤖 DevFlow AI Code Review\n\n"
    
    # Summary
    comment += f"**Summary:** {analysis.get('summary', 'Code analyzed')}\n\n"
    comment += f"**Quality Score:** {analysis.get('score', 5)}/10\n\n"
    
    # Issues by severity
    high_issues = [i for i in analysis.get("issues", []) if i["severity"] == "high"]
    medium_issues = [i for i in analysis.get("issues", []) if i["severity"] == "medium"]
    low_issues = [i for i in analysis.get("issues", []) if i["severity"] == "low"]
    
    if high_issues:
        comment += "### ⚠️ High Priority Issues\n\n"
        for issue in high_issues[:5]:
            comment += f"- **{issue['type'].title()}**: {issue['message']}\n"
            comment += f"  - *Suggestion:* {issue['suggestion']}\n\n"
    
    if medium_issues:
        comment += "### 🔸 Medium Priority Issues\n\n"
        for issue in medium_issues[:3]:
            comment += f"- **{issue['type'].title()}**: {issue['message']}\n\n"
    
    if low_issues:
        comment += "### 💡 Suggestions\n\n"
        for issue in low_issues[:3]:
            comment += f"- {issue['message']}\n"
    
    if not analysis.get("issues"):
        comment += "### ✅ No Issues Found\n\nGreat job! Code looks good.\n"
    
    comment += "\n---\n*Powered by DevFlow | AI Code Review (Gemini 2.0 Flash)*"
    
    return comment