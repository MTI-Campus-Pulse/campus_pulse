from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv
load_dotenv()  # يحمل .env

# DATABASE_URL = os.getenv("DATABASE_URL")  # اللينك من .env

# engine = create_engine(DATABASE_URL)

# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base = declarative_base()
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# from typing import Dict, List
# from datetime import datetime




# Fake Database (In-Memory)
fake_db: Dict[str, dict] = {
    "student@stu.mti.edu": {
        "email": "student@stu.mti.edu",
        "password": "changeme",
        "role": "student",
        "interests": [   {"name": "AI", "weight": "3"},        # ← نفس أسماء الفئات في الـ AI
            {"name": "Jobs", "weight": "3"},
            {"name": "Events", "weight": "3"}]
    },
    "manager@m.mti.edu": {
        "email": "manager@m.mti.edu",
        "password": "changeme",
        "role": "manager",
        "interests": []
    },
    "admin@a.mti.edu": {
        "email": "admin@a.mti.edu",
        "password": "changeme",
        "role": "admin",
        "interests": []
    },
    "pr@pr.mti.edu": {
        "email": "pr@pr.mti.edu",
        "password": "changeme",
        "role": "pr",
        "interests": []
    }
}

# Posts Database
posts_db: List[dict] = []

# Feedback Database
feedback_db: List[dict] = []

# FAQ Database (Chatbot)
faq_data = [
    {"keywords": ["مصروفات", "فلوس", "سداد"], "answer": "يتم سداد المصروفات الدراسية عن طريق البنك قبل بداية الفصل الدراسي."},
    {"keywords": ["امتحان", "ميدترم", "اختبار"], "answer": "تبدأ امتحانات منتصف الفصل يوم 15 ديسمبر."},
    {"keywords": ["تدريب", "وظيفة"], "answer": "التقديم على التدريب الصيفي مفتوح حتى نهاية الشهر."},
    {"keywords": ["فعالية", "حدث", "ندوة"], "answer": "سيتم عقد فعالية الذكاء الاصطناعي يوم الخميس القادم."}
]

# دالة مساعدة للحصول على مستخدم
def get_user(email: str):
    return fake_db.get(email)

# دالة مساعدة لتحديث مستخدم
def update_user(email: str, **kwargs):
    if email in fake_db:
        fake_db[email].update(kwargs)
        return True
    return False

