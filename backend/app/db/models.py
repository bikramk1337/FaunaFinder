from datetime import datetime
from enum import Enum
from typing import Optional
from sqlalchemy import Column, DateTime, func
from sqlmodel import Field, SQLModel

# BaseTable to be inherited on database table classes
# This adds id, and created and updated Timestamps on table 
class BaseTable(SQLModel):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: Optional[datetime] = Field(
        default=None,
        sa_column=Column(
            DateTime(timezone=True), server_default=func.now(), nullable=True
        )
    )
    updated_at: Optional[datetime] = Field(
        default=None,
        sa_column=Column(
            DateTime(timezone=True), onupdate=func.now(), nullable=True
        )
    )

class UserType(str, Enum):
    REGULAR = "regular"
    DASHBOARD = "dashboard"
    SUPERUSER = "superuser"

# SQLModel Classes for User
class UserBase(SQLModel):
    email: str = Field(unique=True, index=True)
    is_active: bool = True
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
class User(UserBase, BaseTable, table=True):
    hashed_password: str
