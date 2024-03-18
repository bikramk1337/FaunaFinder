from sqlmodel import Session, create_engine, select

from app.core.config import settings
from app.db.models import User, UserCreate

engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI))

def init_db(session: Session) -> None:
    pass