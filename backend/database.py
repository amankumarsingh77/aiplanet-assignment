# database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


DB_URL = "postgresql://openagi_owner:8mhyUIarY2PW@ep-soft-silence-a1433ev6.ap-southeast-1.aws.neon.tech/openagi?sslmode=require"

engine = create_engine(DB_URL)

# Create a sessionmaker object
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a base class for declarative models
Base = declarative_base()
