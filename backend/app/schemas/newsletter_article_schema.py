from pydantic import BaseModel, ConfigDict
from typing import Optional

class NewsletterArticleBase(BaseModel):
    newsletter_id: int
    article_id: int
    is_opened: bool = False
    position: Optional[int] = None # إضافة الترتيب
    rank_score: Optional[float] = None # إضافة السكور (Float للكسور)

class NewsletterArticleResponse(NewsletterArticleBase):
    model_config = ConfigDict(from_attributes=True)

# السكيما المجمعة اللي هتروح للفرونت إند (مهمة جداً)
class ArticleInNewsletter(BaseModel):
    article_id: int
    title: str
    summary: str
    image_url: Optional[str] = None  # إضافة رابط الصورة
    category_id: int
    is_opened: bool
    position: int # عشان الفرونت يعرف مكانه في الداش بورد
    published_at: str # عشان يعرف الخبر ده قديم ولا جديد
    
    model_config = ConfigDict(from_attributes=True)