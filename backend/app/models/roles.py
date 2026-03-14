from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from backend.app.db.database import Base

class Role(Base):
    __tablename__ = "roles"

    role_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True) # مثلاً: Student, Advisor, Admin

    # علاقة مع جدول اليوزرز (كل رول ممكن يكون تحتها يوزرز كتير)
    users = relationship("User", back_populates="role")