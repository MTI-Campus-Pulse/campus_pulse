from sqlalchemy import Column, Integer, ForeignKey, Boolean
from backend.app.db.database import Base

class NewsletterArticle(Base):
    __tablename__ = "newsletter_articles"

    newsletter_id = Column(Integer, ForeignKey("newsletters.newsletter_id"), primary_key=True)
    article_id = Column(Integer, ForeignKey("articles.article_id"), primary_key=True)
    is_opened = Column(Boolean, default=False) # هل الطالب فتح الخبر؟
    rank_score = Column(Integer, nullable=True) # ترتيب الخبر داخل النشرة (1 للأعلى)
    position = Column(Integer, nullable=True) # موقع الخبر داخل النشرة (1 للأعلى
