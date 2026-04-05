from pydantic import BaseModel, ConfigDict
from typing import Optional

class NewsletterArticleBase(BaseModel):
    newsletter_id: int
    article_id: int
    is_opened: bool = False
<<<<<<< HEAD
    position: Optional[int] = None 
    rank_score: Optional[float] = None 
=======
    position: Optional[int] = None # إضافة الترتيب
    rank_score: Optional[float] = None # إضافة السكور (Float للكسور)
>>>>>>> origin/main

class NewsletterArticleResponse(NewsletterArticleBase):
    model_config = ConfigDict(from_attributes=True)

<<<<<<< HEAD
# السكيما المجمعة اللي هتروح للفرونت إند
=======
# السكيما المجمعة اللي هتروح للفرونت إند (مهمة جداً)
>>>>>>> origin/main
class ArticleInNewsletter(BaseModel):
    article_id: int
    title: str
    summary: str
<<<<<<< HEAD
    image_url: Optional[str] = None  
    category_id: int
    is_opened: bool
    position: int 
    published_at: str 
    
    # التعديل المهم هنا: بنسمح للـ Pydantic يقرأ من الـ Dictionaries اللي بنبعتها
    model_config = ConfigDict(from_attributes=True) 

# سكيما الرد النهائي اللي بتجمع كل حاجة (الـ Dashboard)
class NewsletterDashboardResponse(BaseModel):
    student_name: str
    edition: int
    newsletter_date: str
    newsletter_id: int
    articles: list[ArticleInNewsletter]
=======
    image_url: Optional[str] = None  # إضافة رابط الصورة
    category_id: int
    is_opened: bool
    position: int # عشان الفرونت يعرف مكانه في الداش بورد
    published_at: str # عشان يعرف الخبر ده قديم ولا جديد
    
    model_config = ConfigDict(from_attributes=True)
>>>>>>> origin/main
