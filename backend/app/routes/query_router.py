from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.databse import get_db
from services.query_service import add_query
from pydantic import BaseModel

router = APIRouter(prefix="/queries", tags=["Queries"])

# This defines exactly what the data looks like coming in
class QuerySchema(BaseModel):
    id: int
    content: str

@router.post("/add-query")
def create_query(query: QuerySchema, db: Session = Depends(get_db)):
    return add_query(db, query.id, query.content)