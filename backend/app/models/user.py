from typing import List, Dict, Optional

class User:
    def __init__(self, email: str, password: str, role: str, interests: Optional[List[Dict[str, str]]] = None):
        self.email = email
        self.password = password
        self.role = role
        self.interests = interests or []
    
    def to_dict(self) -> dict:
        return {
            "email": self.email,
            "role": self.role,
            "interests": self.interests
        }
    
