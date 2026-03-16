from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import List

class NewsletterBase(BaseModel):
    user_id: int
    articles_count: int

class NewsletterResponse(NewsletterBase):
    newsletter_id: int
    published_date: datetime  # تعديل الاسم ليتطابق مع الداتابيز
    edition: int = None  # رقم الإصدار
    
    # إضافة الحقل ده لو هتحتاجي ترجعي الأخبار جوه النشرة في ريكويست واحد
    # articles: Optional[List[ArticleInNewsletter]] = None 

    model_config = ConfigDict(from_attributes=True)