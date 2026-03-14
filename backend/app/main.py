from fastapi import FastAPI
from app.core.config import settings
from app.routes import article_route , newsletter_route
# from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="University Newsletter System")

# قائمة بالعناوين المسموح لها تكلم الباك إند
# origins = ["*"]
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"], # السماح بكل أنواع الطلبات (GET, POST, etc.)
#     allow_headers=["*"], # السماح بكل الـ Headers
# )

# تضمين الروت الجديد الخاص بالمقالات
app.include_router(article_route.router)
app.include_router(newsletter_route.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to University Newsletter API - Articles System"}



from fastapi.middleware.cors import CORSMiddleware
from backend.app.routes import auth, posts, feedback, chat, reports
from fastapi import FastAPI
from supabase import create_client, Client
import matplotlib.pyplot as plt
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware
from bidi.algorithm import get_display
from dotenv import load_dotenv  # 1. استيراد المكتبة
import os
from backend.app.ai_modules import CampusPulsePipeline
import json

load_dotenv() 

# import google.generativeai as genai

# genai.configure(api_key="YOUR_API_KEY")

# model = genai.GenerativeModel("gemini-pro")
# response = model.generate_content("لخص هذا النص بالعربية...")
# print(response.text)  

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
# app.include_router(chat.router)
app.include_router(reports.router)
