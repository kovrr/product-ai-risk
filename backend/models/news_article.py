from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from sqlalchemy.sql import func
from database import Base

class NewsArticle(Base):
    __tablename__ = "news_articles"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(500), nullable=False)
    summary = Column(Text, nullable=True)
    url = Column(String(1000), nullable=False, unique=True)
    source = Column(String(100), nullable=False)  # IAPP, CISO Series, etc.
    source_url = Column(String(500), nullable=True)
    framework = Column(String(100), nullable=True)  # EU AI Act, NIST AI RMF, etc.
    article_type = Column(String(50), nullable=True)  # regulation, framework, standard, guidance
    published_at = Column(DateTime(timezone=True), nullable=False)
    fetched_at = Column(DateTime(timezone=True), server_default=func.now())
    is_active = Column(Boolean, default=True)
    
    def __repr__(self):
        return f"<NewsArticle {self.title[:50]}...>"
