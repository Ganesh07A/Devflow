import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

# 1. Get the URL from .env
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

if not SQLALCHEMY_DATABASE_URL:
    print("❌ Error: DATABASE_URL is missing in .env")
    exit()

# 2. Fix for some Postgres drivers (optional but safe)
if SQLALCHEMY_DATABASE_URL.startswith("postgres://"):
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace("postgres://", "postgresql://", 1)

# 3. Create Engine (Neon requires SSL)
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    echo=False,
    # SSL is usually handled by the ?sslmode=require in the URL,
    # but this ensures it works for all drivers
    connect_args={"sslmode": "require"} 
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()