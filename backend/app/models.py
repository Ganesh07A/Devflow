from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, JSON
from sqlalchemy.sql import func
from app.database import Base

class Repository(Base):
    __tablename__= "repositories"

    id = Column(Integer, primary_key=True, index=True)
    github_id = Column(Integer, unique=True)
    name = Column(String(255))
    owner = Column(String(255))
    webhook_id = Column(String(255))
    created_at = Column(DateTime, server_default=func.now())


class PullRequest(Base):
    __tablename__ = "pull_requests"
    
    id = Column(Integer, primary_key=True, index=True)
    repo_id = Column(Integer, ForeignKey("repositories.id"))
    pr_number = Column(Integer)
    title = Column(Text)
    author = Column(String(255))
    diff = Column(Text)
    state = Column(String(50))
    created_at = Column(DateTime)
    reviewed_at = Column(DateTime, nullable=True)

class CodeReview(Base):
    __tablename__ = "code_reviews"
    
    id = Column(Integer, primary_key=True, index=True)
    pr_id = Column(Integer, ForeignKey("pull_requests.id"))
    ai_response = Column(JSON)
    issues_found = Column(Integer, default=0)
    severity_high = Column(Integer, default=0)
    severity_medium = Column(Integer, default=0)
    created_at = Column(DateTime, server_default=func.now())