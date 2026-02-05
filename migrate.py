from app.database import engine,  Base
from app.models import Repository, CodeReview, PullRequest

def init_db():
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully!")


if __name__ == "__main__":
    init_db()
