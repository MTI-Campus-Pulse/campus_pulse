import numpy as np
import json
from datetime import datetime, timezone, timedelta
from app.core.config import settings
from supabase import create_client, Client

supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

class NewsletterService:
    # المسار الخاص بملف الـ JSON
    JSON_FILE = "D:\\fastApi11\\Campus_pulse\\scraper\\pipelines\\final_clean_posts.json"
    ARTICLES_CACHE = None

    @staticmethod
    def cosine(v1, v2):
        if not v1 or not v2:
            return 0.0
        try:
            v1 = np.array(v1, dtype=float)
            v2 = np.array(v2, dtype=float)
            if v1.shape != v2.shape:
                return 0.0
            return float(np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2)))
        except:
            return 0.0

    @staticmethod
    def get_score(user_vec, cat_score, article):
        sim = NewsletterService.cosine(user_vec, article.get("embedding"))
        try:
            pub_str = article.get("published_at") or article.get("published_date")
            pub = datetime.fromisoformat(pub_str.replace("Z", "+00:00"))
            hours = (datetime.now(timezone.utc) - pub).total_seconds() / 3600
            recency = 1 / (1 + hours)
        except:
            recency = 0
        return (0.45 * cat_score) + (0.35 * sim) + (0.20 * recency)

    @staticmethod
    def get_last_friday():
        now = datetime.now(timezone.utc)
        weekday = now.weekday()  # Monday=0, Friday=4
        # حساب كم يوم فاتوا على آخر جمعة (لو النهاردة الجمعة هيعتبرها هي دي)
        days_since_friday = (weekday - 4) % 7
        friday = now - timedelta(days=days_since_friday)
        return friday.replace(hour=0, minute=0, second=0, microsecond=0)

    @staticmethod
    def get_week_range(friday):
        # النطاق من السبت اللي فات للجمعة دي (7 أيام)
        start = friday - timedelta(days=6)
        start = start.replace(hour=0, minute=0, second=0)
        end = friday.replace(hour=23, minute=59, second=59)
        return start, end

    @staticmethod
    def load_json_articles():
        if NewsletterService.ARTICLES_CACHE is None:
            try:
                with open(NewsletterService.JSON_FILE, "r", encoding="utf8") as f:
                    NewsletterService.ARTICLES_CACHE = json.load(f)
            except Exception as e:
                print(f"❌ Error loading JSON file: {e}")
                return []
        return NewsletterService.ARTICLES_CACHE

    @staticmethod
    async def generate_or_fetch_newsletter(user_id: int):
        # 1. جلب بيانات الطالب وتفضيلاته
        user_res = supabase.table("users").select("*, roles(name)").eq("user_id", user_id).single().execute()
        if not user_res.data or user_res.data["roles"]["name"] != "student":
            return {"error": "User not found or not a student"}

        user = user_res.data
        user_vec = user.get("preference_vector")
        student_name = user.get("full_name")

        prefs = supabase.table("user_preferences").select("category_id, category_score").eq("user_id", user_id).gt("category_score", 0).execute()
        categories = [p["category_id"] for p in prefs.data]
        cat_map = {p["category_id"]: p["category_score"] for p in prefs.data}

        # 2. تحديد تاريخ الجمعة المستهدفة والنطاق الزمني
        target_friday = NewsletterService.get_last_friday()
        start_week, end_week = NewsletterService.get_week_range(target_friday)

        # 3. التحقق هل النشرة موجودة للجمعة دي؟
        existing = supabase.table("newsletters") \
            .select("newsletter_id") \
            .eq("user_id", user_id) \
            .eq("published_date", target_friday.date().isoformat()) \
            .execute()

        if existing.data:
            return NewsletterService.fetch_dashboard(existing.data[0]["newsletter_id"], student_name)

        # 4. لو مفيش، نولد نشرة جديدة (شلنا شرط الـ if weekday == 4 عشان التيست)
        arts = supabase.rpc(
            "get_weekly_articles",
            {
                "start_date": start_week.isoformat(),
                "end_date": end_week.isoformat(),
                "cat_ids": categories
            }
        ).execute()

        if not arts.data:
            # لو مفيش أخبار جديدة، هات آخر نشرة قديمة (إذا وجدت)
            last = supabase.table("newsletters").select("newsletter_id").eq("user_id", user_id).order("edition", desc=True).limit(1).execute()
            if last.data:
                return NewsletterService.fetch_dashboard(last.data[0]["newsletter_id"], student_name)
            return {"message": "No articles found for this period."}

        # 5. عمل الـ Ranking
        ranked = []
        for a in arts.data:
            score = NewsletterService.get_score(user_vec, cat_map.get(a["category_id"], 0), a)
            ranked.append({"article_id": a["article_id"], "score": score})

        ranked.sort(key=lambda x: x["score"], reverse=True)
        top = ranked[:6]

        # 6. حساب رقم الإصدار (Edition)
        count_res = supabase.table("newsletters").select("newsletter_id", count="exact").eq("user_id", user_id).execute()
        edition = (count_res.count or 0) + 1

        # 7. حفظ النشرة الجديدة
        nl_res = supabase.table("newsletters").insert({
            "user_id": user_id,
            "edition": edition,
            "articles_count": len(top),
            "published_date": target_friday.date().isoformat()
        }).execute()

        nl_id = nl_res.data[0]["newsletter_id"]

        # 8. حفظ مقالات النشرة
        for i, a in enumerate(top):
            supabase.table("newsletter_articles").insert({
                "newsletter_id": nl_id,
                "article_id": a["article_id"],
                "rank_score": a["score"],
                "position": i + 1
            }).execute()

        return NewsletterService.fetch_dashboard(nl_id, student_name)

    @staticmethod
    def fetch_dashboard(nl_id, student_name):
        # جلب بيانات النشرة
        nl_res = supabase.table("newsletters").select("edition, published_date").eq("newsletter_id", nl_id).single().execute()
        
        # جلب المقالات المربوطة
        rows = supabase.table("newsletter_articles") \
            .select("article_id, position, articles(published_at)") \
            .eq("newsletter_id", nl_id) \
            .order("position") \
            .execute()

        json_articles = NewsletterService.load_json_articles()
        # تحويل الـ JSON لماب لسرعة البحث
        json_map = {a["article_id"]: a for a in json_articles}

        output = []
        for r in rows.data:
            aid = r["article_id"]
            art_json = json_map.get(aid, {})
            
            # معالجة التاريخ من الداتابيز
            pub_at = r.get("articles", {}).get("published_at") if isinstance(r.get("articles"), dict) else None

            output.append({
                "article_id": aid,
                "position": r["position"],
                "published_at": pub_at,
                "title": art_json.get("title") or art_json.get("headline") or "No Title",
                "summary": art_json.get("summary") or art_json.get("description") or "No Summary",
                "content": art_json.get("content") or art_json.get("full_text") or "No Content",
                "photo": art_json.get("photo") or art_json.get("image_url") or "/newsimage/placeholder.jpg"
            })

        return {
            "student_name": student_name,
            "edition": nl_res.data["edition"],
            "newsletter_date": nl_res.data["published_date"],
            "newsletter_id": nl_id,
            "articles": output
        }