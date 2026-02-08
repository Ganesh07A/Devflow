# webhoook handler that listens github PR events
from fastapi import APIRouter, Request, HTTPException
import hmac
import hashlib
from app.config import settings
from app.review import process_pr_review

router  = APIRouter()

def verify_signature(payload: bytes, signature: str, secret: str) -> bool:
    # verigy github webhook dignature for security

    if not signature: return False

    expected = hmac.new(
        secret.encode(),
        payload,
        hashlib.sha256
    ).hexdigest()

    return hmac.compare_digest(f"sha256={expected}", signature)

@router.post("/webhook/github")
async def github_webhook(req: Request):
    '''handle incoming github webhook events   '''

    # get raw payload for signature verification
    payload  = await req.body()
    signature = req.headers.get("X-Hub-Signature-256")

    # verify webhook is from github or not 
    if not verify_signature(payload, signature , settings.WEBHOOK_SECRET ):
        raise HTTPException(status_code=403, detail="Invalid signature !")
    
    # get event type and data 
    event = req.headers.get("X-GitHub-Event")
    data = await req.json()

    print(f"✅ Webhook received! Event: {event}")  # Add for debugging

    # handles pull request events

    if event == "pull_request":
        action=data.get("action")

        if action == "opened":
            pr_number= data["pull_request"]["number"]
            repo= data["repository"]["full_name"]
            title= data["pull_request"]["title"]
            author= data["pull_request"]["user"]["login"]

            print(f"New PR #{pr_number} opened in {repo}")
            print(f" Title : {title}")
            print(f" Author: {author}")

            # here we add AI review later 
            try: 
                await process_pr_review(repo, pr_number, data["pull_request"])

            except Exception as e:
                print("review Failed!")
                return { 
                    "status": "error",
                    "message": str(e)
                }


            return{
                "status": "received",
                "message": f"PR #{pr_number} will be reviewed"
            }
        
    elif event == "ping":
        # github sends this when webhook is first created 
        print("🏓 Ping received!")
        
        return {"status":"pong"}

    return {"status": "event ignored "}

