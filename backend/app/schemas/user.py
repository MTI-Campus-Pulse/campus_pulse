from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserRegister(BaseModel):
    email: EmailStr
    password: str
    confirm_password: str
    interests: Optional[List[Dict[str, str]]] = None