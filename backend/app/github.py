# github webhooks handler

import httpx
from app.config import settings

GITHUB_API ="https://api.github.com"

'''fetch PR diff from github'''
async def get_pr_diff(repo: str, pr_number: int) -> str:
    url = f"{GITHUB_API}/repos/{repo}/pulls/{pr_number}"

    headers ={
        "Authorization": f"token {settings.GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3.diff"
    }

    async with httpx.AsyncClient() as client:
        reponse  = await client.get(url, headers=headers)
        reponse.raise_for_status()
        return reponse.text
    


'''POst comment on the PR '''
async def post_pr_comment(repo: str, pr_number: int, comment: str) -> dict:
    url = f"{GITHUB_API}/repos/{repo}/issues/{pr_number}/comments"
    headers={
        "Authorization": f"token {settings.GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    }

    async with httpx.AsyncClient() as client: 
        response = await client.post(
            url, 
            headers=headers,
            json={"body": comment}
        )
        response.raise_for_status()
        return response.json()
    


'''GEt list of files changed '''
async def get_pr_files(repo: str, pr_number: int) -> list:
    
    url = f"{GITHUB_API}/repos/{repo}/pulls/{pr_number}/files"
    headers={
        "Authorization": f"token {settings.GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(
            url,
            headers=headers
        )
        response.raise_for_status()
        return response.json()