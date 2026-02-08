from anthropic import Anthropic
from app.config import settings
import json

client = Anthropic(api_key=settings.ANTHROPIC_API_KEY)

async def analyze_code(diff: str, files: list = None) -> dict:
    """Send code diff to Claude for analysis"""
    
    # Prepare context about files changed
    files_context = ""
    if files:
        file_names = [f["filename"] for f in files[:10]]  # Limit to 10 files
        files_context = f"\n\nFiles changed: {', '.join(file_names)}"
    
    prompt = f"""Analyze this code diff and identify issues:

1. **Security vulnerabilities** (SQL injection, XSS, exposed secrets, insecure dependencies)
2. **Bug-prone patterns** (null checks, race conditions, error handling, edge cases)
3. **Best practice violations** (naming conventions, code structure, comments)
4. **Performance issues** (N+1 queries, inefficient loops, memory leaks)

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

Return ONLY valid JSON, no markdown formatting."""

    try:
        message = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=2000,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        
        response_text = message.content[0].text
        # Clean potential markdown formatting
        response_text = response_text.replace("```json", "").replace("```", "").strip()
        
        return json.loads(response_text)
    
    except Exception as e:
        print(f"❌ AI analysis error: {e}")
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
        for issue in high_issues[:5]:  # Limit to 5
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
    
    comment += "\n---\n*Powered by DevFlow | AI Code Review Assistant*"
    
    return comment