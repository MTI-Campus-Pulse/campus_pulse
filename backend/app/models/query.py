from sqlalchemy import Column, Integer, String
from db.databse import Base
class Query(Base):
    __tablename__ = "queries"
    id = Column(Integer, primary_key=True, index=True)
    content = Column(String, nullable=False)