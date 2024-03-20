from datetime import datetime
from enum import Enum
from typing import Optional
from sqlalchemy import Column, DateTime
import sqlalchemy as sa
from sqlmodel import Field, SQLModel


class TimestampMixin(SQLModel):
    created_at: datetime | None = Field(
        default=None,
        sa_type=sa.DateTime(timezone=True),
        sa_column_kwargs={"server_default": sa.func.now()},
        nullable=False,
    )
    updated_at: datetime | None = Field(
        default=None,
        sa_type=sa.DateTime(timezone=True),
        sa_column_kwargs={"onupdate": sa.func.now(), "server_default": sa.func.now()},
    )


class UserType(str, Enum):
    REGULAR = "regular"
    DASHBOARD = "dashboard"
    SUPERUSER = "superuser"

# SQLModel Classes for User
class UserBase(SQLModel):
    email: str = Field(unique=True, index=True)
    is_active: bool = True
    email_verified: bool = False
    user_type: UserType = Field(default=UserType.REGULAR)
    full_name: str | None = None

class UserCreate(UserBase):
    password: str

class UserSignUp(SQLModel):
    email: str
    password: str
    full_name: str | None = None

class UserUpdate(UserBase):
    email: str | None = None  # type: ignore
    password: str | None = None
    full_name: str | None = None

class UserUpdateCurrent(SQLModel):
    full_name: str | None = None
    email: str | None = None

class UpdatePassword(SQLModel):
    current_password: str
    new_password: str

class UserOut(UserBase):
    id: int


class UsersOut(SQLModel):
    data: list[UserOut]
    count: int

class TokenPayload(SQLModel):
    sub: int | None = None

class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"

class Message(SQLModel):
    message: str

class NewPassword(SQLModel):
    token: str
    new_password: str   

# Database model, database table inferred from class name
class User(UserBase, TimestampMixin, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str

class EmailVerification(TimestampMixin, table=True):
    id: int = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    code: str
    expires_at: datetime = Field(sa_column=Column(DateTime(timezone=True)))