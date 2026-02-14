from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Simulated Database
query_db = []
operation_logs = []

# Data model for the query information
class Query(BaseModel):
    id: int
    content: str

@app.post("/add-query")
async def add_query(new_query: Query):
    # 1. READ query information (handled by FastAPI/Pydantic)
    
    # 2. IF query exist THEN
    query_exists = any(q.id == new_query.id for q in query_db)
    
    if query_exists:
        # WRITE error message
        raise HTTPException(status_code=400, detail="Error: Query already exists")
    
    # 3. ELSE (if it doesn't exist)
    else:
        # store query
        query_db.append(new_query)
        
        # store operation (logging the action)
        operation_logs.append(f"Stored query ID: {new_query.id}")
        
        # WRITE query added
        return {
            "message": "Query added successfully",
            "data": new_query,
            "total_queries": len(query_db)
        }

# Helper endpoint to see what's stored
@app.get("/queries")
async def get_all_queries():
    return {"database": query_db, "logs": operation_logs}
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# Simulated Database
query_db = [{"id": 1, "content": "Initial Query"}]
operation_logs = []

class QueryUpdate(BaseModel):
    content: str

@app.put("/update-query/{query_id}")
async def update_query(query_id: int, updates: QueryUpdate):
    # 1. READ query id, new updates (handled by FastAPI path and body)
    
    # 2. IF query exist THEN
    query_index = next((index for (index, d) in enumerate(query_db) if d["id"] == query_id), None)
    
    if query_index is not None:
        # 3. IF updated valid THEN (Check if content is not empty)
        if len(updates.content.strip()) > 0:
            # store query (Apply the update)
            query_db[query_index]["content"] = updates.content
            
            # WRITE query updated
            message = "Query updated successfully"
            result = query_db[query_index]
        else:
            # WRITE error message (invalid update)
            raise HTTPException(status_code=400, detail="Error: Updated content is invalid/empty")
    
    # 4. ELSE (query doesn't exist)
    else:
        # WRITE error message
        raise HTTPException(status_code=404, detail="Error: Query does not exist")

    # 5. store operation (Runs after successful logic branch)
    operation_logs.append(f"Updated query ID: {query_id}")
    
    return {"message": message, "data": result}