from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.webhooks import router as webhook_router
app = FastAPI(title="Devflow Platform")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)

app.include_router(webhook_router)

@app.get("/")
def home():
    return {"message":"Devflow Platform"}

#  Add this to see all routes
@app.get("/debug/routes")
async def list_routes():
    routes = []
    for route in app.routes:
        routes.append({
            "path": route.path,
            "methods": list(route.methods) if hasattr(route, 'methods') else []
        })
    return {"routes": routes}