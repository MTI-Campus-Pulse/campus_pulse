from ..database import posts_db, fake_db
from ..services.email_service import send_email
from typing import List, Dict

def create_post(title: str, content: str, category: str) -> dict:
    """إنشاء بوست جديد"""
    post = {
        "id": len(posts_db) + 1,
        "title": title,
        "content": content,
        "category": category,
        "created_at": __import__('datetime').datetime.now().isoformat()
    }
    posts_db.append(post)
    return post

def get_all_posts() -> List[dict]:
    """الحصول على كل البوستات"""
    return posts_db

def notify_interested_users(post: dict) -> List[str]:
    """إرسال إشعارات للطلاب المهتمين"""
    notified_emails = []
    
    for email, user_data in fake_db.items():
        if user_data["role"] == "student":
            user_interests = [i["name"] for i in user_data.get("interests", [])]
            if post["category"] in user_interests:
                send_email(
                    to_email=email,
                    subject=f"📢 بوست جديد: {post['title']}",
                    body=f"تم نشر بوست جديد في فئة {post['category']}\n\n{post['content'][:150]}..."
                )
                notified_emails.append(email)
    
    return notified_emails