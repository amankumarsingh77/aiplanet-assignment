from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DB_URL = "postgresql://openagi_owner:8mhyUIarY2PW@ep-soft-silence-a1433ev6.ap-southeast-1.aws.neon.tech/openagi?sslmode=require"
engine = create_engine(DB_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
