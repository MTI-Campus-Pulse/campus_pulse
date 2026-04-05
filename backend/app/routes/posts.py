from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from backend.app.db.database import get_db
from backend.app.models.post import Post  # افترض وجود نموذج Article
from backend.app.models.post import Category  # افترض وجود نموذج Category
from backend.app.services.campus_pipeline import process_text
import json
import os
from datetime import datetime

router = APIRouter(prefix="/api/posts", tags=["Posts"])

# مسار ملف JSON (يحتوي على article_id)
JSON_FILE_PATH = r"C:\Users\mazen\campus_pulse\backend\app\final_clean_posts.json"

@router.post("/sync-from-json")
def sync_posts_from_json(db: Session = Depends(get_db)):
    if not os.path.exists(JSON_FILE_PATH):
        raise HTTPException(status_code=404, detail="ملف JSON غير موجود")

    try:
        # 1. قراءة الأخبار من JSON
        with open(JSON_FILE_PATH, "r", encoding="utf-8") as f:
            news_list = json.load(f)

        updated_count = 0
        processed_data = []

        for item in news_list:
            article_id = item.get("article_id")
            if not article_id:
                continue

           # 2. البحث في قاعدة البيانات عن الخبر (للتحقق من الحالة فقط)
            db_article = db.query(Post).filter(
                Post.article_id == article_id,
                Post.status == "cleaned"
            ).first()

            if not db_article:
                continue  # تخطي إذا غير cleaned أو غير موجود

            # 3. استخدم المحتوى من ملف JSON (ليس من قاعدة البيانات)
            content = item.get("content", "").strip()
            if len(content) < 30:
                continue
            # 3. معالجة النص عبر AI
            ai_result = process_text(text=content)

            # 4. العثور على category_id من اسم الفئة
            category_name = ai_result.get("category", "general news")
           # البحث عن الفئة
            db_category = db.query(Category).filter(Category.name == category_name).first()

            # استخدام الاسم الصحيح للحقل
            category_id = db_category.category_id if db_category else None

            # تحديث المقالة
            db_article.status = "pinned"
            db_article.category_id = category_id
            db.commit()

            # 6. تحديث العنصر في القائمة لحفظه في JSON
            item["summary"] = ai_result["summary"]
            item["category"] = category_name
            item["processed_at"] = datetime.now().isoformat()
            processed_data.append(item)

            updated_count += 1

        # 7. حفظ النسخة المحدثة في نفس ملف JSON
        with open(JSON_FILE_PATH, "w", encoding="utf-8") as f:
            json.dump(processed_data, f, ensure_ascii=False, indent=2)

        return {
            "success": True,
            "message": f"تم معالجة وتحديث {updated_count} خبر بنجاح",
            "file": JSON_FILE_PATH
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"خطأ أثناء المعالجة: {str(e)}")

# @router.get("/")
# def get_processed_posts():
#     if not os.path.exists(JSON_FILE_PATH):
#         return {"success": True, "posts": [], "message": "لم يتم معالجة أي أخبار بعد"}
    
#     with open(JSON_FILE_PATH, "r", encoding="utf-8") as f:
#         posts = json.load(f)
    
#     return {
#         "success": True,
#         "posts": posts
#     }