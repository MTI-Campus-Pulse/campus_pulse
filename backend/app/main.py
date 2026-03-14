from fastapi import FastAPI
from app.core.config import settings
from app.routes import article_route , newsletter_route
# from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="University Newsletter System")

# قائمة بالعناوين المسموح لها تكلم الباك إند
# origins = ["*"]
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"], # السماح بكل أنواع الطلبات (GET, POST, etc.)
#     allow_headers=["*"], # السماح بكل الـ Headers
# )

# تضمين الروت الجديد الخاص بالمقالات
app.include_router(article_route.router)
app.include_router(newsletter_route.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to University Newsletter API - Articles System"}



