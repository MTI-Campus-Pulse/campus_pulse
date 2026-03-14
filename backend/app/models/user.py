from sqlalchemy import Column, Integer, Text, DateTime, ForeignKey, func, Float
from backend.app.db.database import Base
from pgvector.sqlalchemy import Vector

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    email = Column(Text, unique=True, nullable=False)
    password = Column(Text, nullable=False)
    phone = Column(Text, nullable=True)
    full_name = Column(Text, nullable=True)
    faculty = Column(Text, nullable=True)
    role_id = Column(Integer, nullable=True) # مربوط بجدول roles اللي في الصورة
    student_id = Column(Integer, nullable=True)
    joined_at = Column(DateTime(timezone=True), server_default=func.now()) 
    preference_vector= Column(Vector(384), nullable=True)  # ممكن تخزنها كـ JSON string أو أي تنسيق يناسبك

    def to_dict(self) -> dict:
        return {
            "user_id": self.user_id,
            "email": self.email,
            "full_name": self.full_name,
            "faculty": self.faculty,
            "role_id": self.role_id,
            "student_id": self.student_id,
            "joined_at": self.joined_at.isoformat() if self.joined_at else None,
            "preference_vector": self.preference_vector,    
            "phone": self.phone
        }
    
class Role(Base):
    __tablename__ = "roles"

    role_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(Text, unique=True, nullable=False)

    def to_dict(self) -> dict:
        return {
            "role_id": self.role_id,
            "name": self.name
        }
    def __repr__(self):
        return f"<Role(role_id={self.role_id}, name='{self.name}')>"
        
class UserPreference(Base):
    __tablename__ = "user_preferences"

    user_id = Column(Integer, ForeignKey("users.user_id"), primary_key=True)
    category_id = Column(Integer, ForeignKey("categories.category_id"), primary_key=True)
    preference_vector = Column(Vector(384), nullable=True)
    subscribed_at = Column(DateTime(timezone=True), server_default=func.now())
    category_score = Column(Float, nullable=True)  # ممكن تستخدمها لتخزين درجة الاهتمام بالفئة
    def to_dict(self) -> dict:
        return {
            "user_id": self.user_id,
            "category_id": self.category_id,
            "score": self.score,
            "subscribed_at": self.subscribed_at.isoformat() if self.subscribed_at else None ,   
            "preference_vector": self.preference_vector,
            "category_score": self.category_score
        }  
