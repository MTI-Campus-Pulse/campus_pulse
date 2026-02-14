# from fastapi import FastAPI

# app = FastAPI()


# @app.get("/")
# def read_root():
#     return {"message": "Campus Pulse Backend is running!"}  # اختبار بسيط




from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import auth, posts, feedback, chat
from fastapi import FastAPI
from .database import fake_db, posts_db, feedback_db
from backend.app.services.campus_pipeline import process_text
from pydantic import BaseModel
app = FastAPI(title="CampusPulse Backend API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(posts.router)
app.include_router(feedback.router)
app.include_router(chat.router)
