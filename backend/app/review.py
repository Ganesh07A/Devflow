from app.github import get_pr_diff, post_pr_comment, get_pr_files
# from app.ai import analyze_code, format_review_comment

from app.gemini_ai import analyze_code, format_review_comment
from app.database import SessionLocal
from app.models import PullRequest, CodeReview
from datetime import datetime

async def process_pr_review(repo: str, pr_number: int, pr_data: dict):
    """Complete PR review workflow"""
    
    print(f"🔍 Starting review for PR #{pr_number} in {repo}")
    
    try:
        # 1. Fetch PR diff and files
        print("📥 Fetching PR diff...")
        diff = await get_pr_diff(repo, pr_number)
        files = await get_pr_files(repo, pr_number)
        
        print(f"📊 Files changed: {len(files)}")
        
        # 2. Analyze with AI
        print("🤖 Analyzing code with AI...")
        analysis = await analyze_code(diff, files)
        
        print(f"📋 Issues found: {len(analysis.get('issues', []))}")
        
        # 3. Save to database
        db = SessionLocal()
        try:
            # Save PR
            pr = PullRequest(
                pr_number=pr_number,
                title=pr_data["title"],
                author=pr_data["user"]["login"],
                diff=diff[:10000],  # Truncate to avoid huge DB entries
                state="open",
                created_at=datetime.utcnow()
            )
            db.add(pr)
            db.commit()
            db.refresh(pr)
            
            # Save review
            review = CodeReview(
                pr_id=pr.id,
                ai_response=analysis,
                issues_found=len(analysis.get("issues", [])),
                severity_high=sum(1 for i in analysis.get("issues", []) if i["severity"] == "high"),
                severity_medium=sum(1 for i in analysis.get("issues", []) if i["severity"] == "medium")
            )
            db.add(review)
            db.commit()
            
            print("💾 Saved to database")
        finally:
            db.close()
        
        # 4. Format comment
        comment = format_review_comment(analysis)
        
        # 5. Post to GitHub
        print("💬 Posting review to GitHub...")
        await post_pr_comment(repo, pr_number, comment)
        
        print("✅ Review complete!")
        
        return analysis
    
    except Exception as e:
        print(f"❌ Error processing review: {e}")
        raise