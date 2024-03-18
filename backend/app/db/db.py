from sqlmodel import Session, create_engine, select

from app.core.config import settings
from app.db.models import User, UserCreate
from app.db import crud

engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI))

def init_db(session: Session) -> None:
    user = session.exec(
        select(User).where(User.email == settings.SUPERUSER_EMAIL)
    ).first()
    if not user:
        user_in = UserCreate(
            email=settings.SUPERUSER_EMAIL,
            password=settings.SUPERUSER_PASSWORD,
            is_superuser=True,
        )
        user = crud.create_user(session=session, user_create=user_in)
