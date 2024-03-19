
from typing import Any
from datetime import datetime, timedelta, timezone


from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select

from app.core.config import settings
from app.db import crud
from app.core.security import create_access_token

from app.api.dependencies import (
    SessionDep,
    generate_verification_code,
)
from app.db.models import (
    UserCreate,
    UserSignUp,
    Message,
    EmailVerification,
    Token
)

router = APIRouter()

@router.post("/signup", response_model=Message)
def sign_up(session: SessionDep, user_in: UserSignUp) -> Any:
    """
    New User Sign Up, to be used by user to register themselves.
    """
    if not settings.USER_SIGNUP:
        raise HTTPException(
            status_code=403,
            detail="Users are forbidden to Sign Up in this server. \
                Please contact your Administrator!",
        )
    user = crud.get_user_by_email(session=session, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email currently exists in the system.",
        )
    user_create = UserCreate.from_orm(user_in)
    user = crud.create_user(session=session, user_create=user_create)

    verification_code = generate_verification_code(session, user.id)
    print(verification_code)

    # TODO: Send the verification code to the user's email
    # send_verification_email(user.email, verification_code)

    return Message(message="Verification code sent Successfully")

@router.post("/verify-email")
def verify_email(session: SessionDep, email: str, code: str) -> Token:
    user = crud.get_user_by_email(session=session, email=email)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Get the latest verification code for the user
    email_verification = session.exec(
        select(EmailVerification)
        .where(EmailVerification.user_id == user.id)
        .order_by(EmailVerification.created_at.desc())  # Order by creation time in descending order
        .limit(1)  # Limit to the latest record
    ).one_or_none()

    if not email_verification or email_verification.code != code:
        raise HTTPException(
            status_code=400,
            detail="Invalid verification code")

    if email_verification.expires_at < datetime.now(timezone.utc):
        raise HTTPException(
            status_code=400,
            detail="Verification code has expired")

    user.email_verified = True

    # Deleting verification code after successful verification to avoid replay attacs
    session.delete(email_verification)
    session.commit()

    access_token_expires = timedelta(days=settings.ACCESS_TOKEN_EXPIRE)
    return Token(
        access_token=create_access_token(
            user.id, expires_delta=access_token_expires
        )
    )

