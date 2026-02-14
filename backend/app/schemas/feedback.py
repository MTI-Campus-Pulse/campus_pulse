from pydantic import BaseModel
from typing import Optional

class FeedbackCreate(BaseModel):
    user_email: str
    post_id: int
    reaction: Optional[str] = None
    comment: Optional[str] = None