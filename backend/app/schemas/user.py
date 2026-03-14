from typing import List, Optional, Dict, Any

from realtime import BaseModel

# أو أفضل: عرّف نموذجًا فرعيًا
class InterestItem(BaseModel):
    name: str

class UserRegister(BaseModel):
    email: str
    password: str
    interests: Optional[List[InterestItem]] = None