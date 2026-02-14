from datetime import datetime

class Feedback:
    def __init__(self, user_email: str, post_id: int, reaction: str = None, comment: str = None):
        self.user_email = user_email
        self.post_id = post_id
        self.reaction = reaction
        self.comment = comment
        self.timestamp = datetime.now().isoformat()
    
    def to_dict(self) -> dict:
        return {
            "user_email": self.user_email,
            "post_id": self.post_id,
            "reaction": self.reaction,
            "comment": self.comment,
            "timestamp": self.timestamp
        }