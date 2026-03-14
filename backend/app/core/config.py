from pydantic import BaseSettings

class Settings(BaseSettings):
    # إعدادات قاعدة البيانات
    DATABASE_URL: str = "sqlite:///./campuspulse.db"
    
    # إعدادات الأمان
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # إعدادات التطبيق
    APP_NAME: str = "CampusPulse"
    DEBUG: bool = True
    
    class Config:
        env_file = ".env"

settings = Settings()