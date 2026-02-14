from fastapi import APIRouter
from pydantic import BaseModel
from ..database import feedback_db, posts_db

router = APIRouter(prefix="/api/feedback", tags=["Feedback"])

class FeedbackCreate(BaseModel):
    user_email: str
    post_id: int
    reaction: str = None
    comment: str = None

@router.post("/")
def add_feedback_api(feedback: FeedbackCreate):
    if not any(post["id"] == feedback.post_id for post in posts_db):
        return {"error": "Post not found"}, 404
    
    feedback_entry = {
        "user_email": feedback.user_email,
        "post_id": feedback.post_id,
        "reaction": feedback.reaction,
        "comment": feedback.comment,
        "timestamp": __import__('datetime').datetime.now().isoformat()
    }
    
    feedback_db.append(feedback_entry)
    
    return {
        "success": True,
        "message": "تم حفظ التعليق بنجاح",
        "feedback_id": len(feedback_db)
    }

@router.get("/")
def get_all_feedback_api():
    return {
        "success": True,
        "feedback": feedback_db,
        "count": len(feedback_db)
    }