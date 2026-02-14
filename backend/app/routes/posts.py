from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List
from backend.app.database import posts_db
from backend.app.services.campus_pipeline import process_text
import datetime
from ..database import fake_db
router = APIRouter(prefix="/api/posts", tags=["Posts"])


class PostRequest(BaseModel):
    content: str

@router.post("/")
def create_post(request: PostRequest):

    content = request.content.strip()

    if len(content) < 30:
        raise HTTPException(
            status_code=400,
            detail="النص قصير جداً (أقل من 30 حرف)"
        )

    ai_result = process_text(
        text=content
    )

    new_post = {
        "id": len(posts_db) + 1,
        "title": ai_result["summary"][:60] + "...",
        "category": ai_result["category"],
        "summary": ai_result["summary"],
        "ai_confidence": ai_result["confidence"],
        "relevance_score": ai_result["relevance_score"],
        "created_at": datetime.datetime.now().isoformat()
    }

    posts_db.append(new_post)
    
    notified = []
    for email, user in fake_db.items():
            if user["role"] == "student":
                print(f"📧 Notification to {email} for post: {new_post  }")
                notified.append(email)    
        
    return {
            "success": True,
            "message": "Post created successfully",
            "post": new_post,
            "notifications_sent": len(notified)
        }


@router.get("/")
def get_posts():
    return {
        "success": True,
        "posts": posts_db,
        "count": len(posts_db)
    }
