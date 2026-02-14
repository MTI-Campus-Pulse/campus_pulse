from pydantic import BaseModel
from typing import Optional

class PostCreate(BaseModel):
    title: str
    content: str
    category: str

class PostResponse(BaseModel):
    id: int
    title: str
    content: str
    category: str
    created_at: str