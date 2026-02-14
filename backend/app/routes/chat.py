from fastapi import APIRouter
from pydantic import BaseModel
from ..services.chat_service import get_chat_response

router = APIRouter(prefix="/api/chat", tags=["Chatbot"])

class ChatRequest(BaseModel):
    question: str

@router.post("/")
def chat_api(request: ChatRequest):
    response = get_chat_response(request.question)
    return response