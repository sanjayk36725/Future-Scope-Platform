from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Defaulting to an in-memory or file-based SQLite database for localized demonstration,
# which can easily be configured to PostgreSQL by modifying the DATABASE_URL.
DATABASE_URL = "sqlite:///./education_platform.db"

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency to get database sessions across FastAPI route parameters
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
