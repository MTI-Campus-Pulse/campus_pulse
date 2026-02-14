from routes.query_router import router as query_router
from fastapi import FastAPI

app = FastAPI()
app.include_router(query_router)

@app.get("/")
def read_root():
    return {"message": "Campus Pulse Backend is running!"}  # اختبار بسيط
