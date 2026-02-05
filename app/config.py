from pydantic_settings import BaseSettings


class Settings(BaseSettings) :
    DATABASE_URL: str
    GITHUB_TOKEN: str
    ANTHROPIC_API_KEY: str
    WEBHOOK_SECRET: str

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()