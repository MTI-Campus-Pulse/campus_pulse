from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.routes import auth, posts, feedback, chat, reports
from fastapi import FastAPI
from backend.app.db.database import get_db
from backend.app.services.user_service import authenticate_user, register_user
from backend.app.services.campus_pipeline import process_text
from pydantic import BaseModel
from supabase import create_client, Client
import matplotlib.pyplot as plt
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware
from bidi.algorithm import get_display
from dotenv import load_dotenv  # 1. استيراد المكتبة
import os
from backend.app.ai_modules import CampusPulsePipeline
import json

app = FastAPI(title="CampusPulse Backend API")
# 2. تحميل المتغيرات فوراً في بداية تشغيل التطبيق
# هذا السطر يضمن أن المتغيرات متاحة لكل الملفات المستوردة بعده
load_dotenv() 
# 3. إعدادات Supabase
SB_URL = "https://imlydashdkziznmjhfgy.supabase.co"
SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbHlkYXNoZGt6aXpubWpoZmd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyOTI2MDEsImV4cCI6MjA4NTg2ODYwMX0.MR0PyzmIwXlz06HOhyZt9dYypL9BV4YboVqbpuEAF-8"
supabase: Client = create_client(SB_URL, SB_KEY)

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
