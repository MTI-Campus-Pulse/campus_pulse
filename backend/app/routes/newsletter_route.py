from fastapi import APIRouter, HTTPException, Query
from app.services.newsletter_service import NewsletterService

router = APIRouter(prefix="/dashboard", tags=["Student Dashboard"])

@router.get("/newsletter")
async def get_student_newsletter(user_id: int = Query(..., description="ID الطالب")):
    result = await NewsletterService.generate_or_fetch_newsletter(user_id)
    
    if isinstance(result, dict) and "error" in result:
        raise HTTPException(status_code=403, detail=result["error"])
        
    return {
        "status": "success",
        "user_id": user_id,
        "data": result
    }