from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.sql import func
from backend.app.db.database import Base

class Newsletter(Base):
    __tablename__ = "newsletters"

    newsletter_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    articles_count = Column(Integer, default=0)
    edition = Column(Integer, nullable=True) # رقم الإصدار (1 للأول، 2 للتاني، إلخ)
    published_date = Column(DateTime(timezone=True), nullable=True) # تاريخ النشر الفعلي