from pydantic import BaseModel, ConfigDict
from datetime import datetime
<<<<<<< HEAD
from typing import List, Optional
=======
from typing import List
>>>>>>> origin/main

class NewsletterBase(BaseModel):
    user_id: int
    articles_count: int

<<<<<<< HEAD
# محتاجين سكيما صغيرة لشكل الخبر جوه النشرة
class NewsletterArticleSchema(BaseModel):
    article_id: int
    title: str
    summary: str
    photo: Optional[str] = None
    position: int # ترتيب الخبر (1 لـ 6)

class NewsletterResponse(BaseModel):
    newsletter_id: int
    user_id: int
    edition: int
    published_date: datetime
    articles_count: int
    # التعديل: إضافة لستة الأخبار عشان الفرونت إند يستلم كل حاجة في ريكويست واحد
    articles: List[NewsletterArticleSchema] = []

    model_config = ConfigDict(from_attributes=True)
    
    # إضافة الحقل ده لو هتحتاجي ترجعي الأخبار جوه النشرة في ريكويست واحد
    # articles: Optional[List[ArticleInNewsletter]] = None
=======
class NewsletterResponse(NewsletterBase):
    newsletter_id: int
    published_date: datetime  # تعديل الاسم ليتطابق مع الداتابيز
    edition: int = None  # رقم الإصدار
    
    # إضافة الحقل ده لو هتحتاجي ترجعي الأخبار جوه النشرة في ريكويست واحد
    # articles: Optional[List[ArticleInNewsletter]] = None 

    model_config = ConfigDict(from_attributes=True)
>>>>>>> origin/main
