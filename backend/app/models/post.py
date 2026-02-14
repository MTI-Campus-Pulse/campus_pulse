from datetime import datetime
from typing import List

class Post:
    def __init__(self, title: str, content: str, category: str):
        self.id = None  # هيتحدد عند الإضافة
        self.title = title
        self.content = content
        self.category = category
        self.created_at = datetime.now().isoformat()
    
    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "category": self.category,
            "created_at": self.created_at
        }