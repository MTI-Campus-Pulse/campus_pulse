from fastapi import FastAPI
from .routes.approval import router

app = FastAPI(title="Campus Pulse")

app.include_router(router)