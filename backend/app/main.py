from fastapi import FastAPI
from routes.query_router import router as query_router
from app.routes import router as approval_router


app = FastAPI(title="Campus Pulse")

app.include_router(query_router)
app.include_router(approval_router)
