from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

# استيرادات مهمة
from backend.app.db.database import get_db
from backend.app.models.feedback import Feedback   # تأكدي من المسار الصح
# لو عندك مودل للـ News/Post، استورديه هنا إذا كنتِ عايزة تتحققي من وجود news_id
# from backend.app.models.news import News

router = APIRouter(prefix="/api/feedback", tags=["Feedback"])

class FeedbackCreate(BaseModel):
    user_id: int                # غيرناه من user_email لـ user_id (أفضل مع foreign key)
    newsletter_id: int                # مطابق لـ news_id في المودل
    reaction: Optional[int] = None   # بدل reaction (يمكن تكون 1-5 أو emoji code)
    comment: Optional[str] = None

class FeedbackResponse(BaseModel):
    feedback_id: int
    comment: Optional[str]
    reaction: Optional[int]
    created_at: str
    newsletter_id: int
    user_id: int

@router.post("/", response_model=FeedbackResponse)
def create_feedback(
    feedback: FeedbackCreate,
    db: Session = Depends(get_db)
):
    # اختياري: تحقق إن الـ news_id موجود (لو عندك جدول news/posts)
    # news = db.query(News).filter(News.id == feedback.news_id).first()
    # if not news:
    #     raise HTTPException(status_code=404, detail="News/Post not found")

    # إنشاء سجل جديد
    db_feedback = Feedback(
        comment=feedback.comment,
        reaction=feedback.reaction,  # غيرناه من rating لـ reaction في المودل
        newsletter_id=feedback.newsletter_id,
        user_id=feedback.user_id,
        created_at=datetime.utcnow()
    )

    db.add(db_feedback)
    db.commit()
    db.refresh(db_feedback)

    return db_feedback.to_dict()  # بيستخدم الدالة اللي موجودة عندك
