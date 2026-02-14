from app.database import engine,  Base
from app.models import Repository, CodeReview, PullRequest

from sqlalchemy import text

def init_db():
    with engine.connect() as connection:
        connection.execute(text("CREATE EXTENSION IF NOT EXISTS vector"))
        connection.commit()
    
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully!")


if __name__ == "__main__":
    init_db()
