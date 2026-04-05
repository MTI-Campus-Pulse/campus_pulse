from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from app.routes import (
    auth, posts, feedback, chat, reports,
    home, manual_email, profile,
    article_route, newsletter_route
)
from app.db.database import SessionLocal
from sqlalchemy.orm import Session
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from app.services.weekly_sender import send_all_ready_newsletters

# تحميل المتغيرات البيئية
load_dotenv()

# إنشاء التطبيق
app = FastAPI(title="University Newsletter System")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# تسجيل الراوترات
app.include_router(auth.router)
app.include_router(posts.router)
app.include_router(feedback.router)
app.include_router(reports.router)
app.include_router(article_route.router)
app.include_router(newsletter_route.router)
app.include_router(home.router)
app.include_router(manual_email.router)
app.include_router(profile.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to University Newsletter API - Articles System"}

# === الجدولة الأسبوعية ===
def job_wrapper():
    db: Session = SessionLocal()
    try:
        send_all_ready_newsletters(db)
    finally:
        db.close()

scheduler = BackgroundScheduler()
scheduler.add_job(
    func=job_wrapper,
    trigger=CronTrigger(day_of_week="sun", hour=12, minute=18),  # كل أحد 12:18 ظهرًا
    id="weekly_newsletter",
    replace_existing=True
)

@app.on_event("startup")
def start_scheduler():
    scheduler.start()
    print("✅ Weekly email scheduler started!")

@app.on_event("shutdown")
def shutdown_scheduler():
    scheduler.shutdown()