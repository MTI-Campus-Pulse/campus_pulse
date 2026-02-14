
from ..core.security import hash_password, verify_password
from typing import Optional, List, Dict
from backend.app.database import fake_db, get_user, update_user

def authenticate_user(email: str, password: str) -> Optional[dict]:
    """التحقق من المستخدم"""
    user = get_user(email)
    if not user:
        return None
    if user["password"] == "changeme" and password == "changeme":
        return user  
    if user["password"] != hash_password(password):
        return None
    return user

def register_user(email: str, password: str, interests: List[Dict[str, str]] = None) -> bool:
    user = get_user(email)
    if not user:
        return False
    
    update_user(email, password=hash_password(password))
    
    if user["role"] == "student" and interests:
        update_user(email, interests=interests)
    return True

def get_user_role(email: str) -> Optional[str]:
    user = get_user(email)
    return user["role"] if user else None