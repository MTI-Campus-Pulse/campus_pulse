from sqlalchemy.orm import Session
from models.query import Query
from fastapi import HTTPException

def add_query(db: Session, query_id: int, content: str):
    # This part checks the database to see if the ID is already there
    existing = db.query(Query).filter(Query.id == query_id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Query already exists")

    # If it's new, we save it to the database
    new_query = Query(id=query_id, content=content)
    db.add(new_query)
    db.commit()
    db.refresh(new_query)
    return new_query