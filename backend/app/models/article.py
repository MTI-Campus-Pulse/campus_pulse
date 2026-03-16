from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, ARRAY, Float
from sqlalchemy.orm import relationship
from backend.app.db.database import Base
from datetime import datetime

class Article(Base):
    __tablename__ = "articles"

    article_id = Column(Integer, primary_key=True, index=True)
    category_id = Column(Integer, ForeignKey("categories.category_id"), nullable=True)
    # newsletter_id = Column(Integer, ForeignKey("newsletters.newsletter_id"), nullable=True, unique=False)
    
    # المستشار الإعلامي المسؤول عن النشر
    university_media_adviser = Column(Integer, ForeignKey("users.user_id"), nullable=True)
    
    status = Column(String, default="draft") # pending, vectorized, published
    
    # عمود التاريخ بصيغة TimeZone (timestamptz)
    publish_at = Column(DateTime(timezone=True), nullable=False)
    
    # عمود الفيكتور (Embedding)
    embedding = Column(ARRAY(Float), nullable=True)

    # العلاقات (اختياري حسب الجداول الأخرى عندك)
    publisher = relationship("User")