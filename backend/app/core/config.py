from typing import Annotated, Any

from pydantic import (
    AnyUrl,
    BeforeValidator,
    PostgresDsn,
    computed_field,
)
from pydantic_core import MultiHostUrl
from pydantic_settings import BaseSettings, SettingsConfigDict
from fastapi_mail import ConnectionConfig


def parse_cors(origins: Any) -> list[str] | str:
    if isinstance(origins, str) and not origins.startswith("["):
        return [origin.strip() for origin in origins.split(",")]
    elif isinstance(origins, list | str):
        return origins
    raise ValueError(origins)

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_ignore_empty=True, extra="ignore"
    )

    BACKEND_CORS_ORIGINS: Annotated[
        list[AnyUrl] | str, BeforeValidator(parse_cors)
    ] = []

    API_V1_STR: str = "/api/v1"
    DOMAIN: str
    SECRET_KEY: str
    # Access Token expires in 7 days
    ACCESS_TOKEN_EXPIRE: int = 7

    PROJECT_NAME: str
    POSTGRES_SERVER: str
    POSTGRES_PORT: int 
    POSTGRES_DB: str 
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str

    PASSWORD_RESET_TOKEN_EXPIRE_HOURS: int = 1

    @computed_field  # type: ignore[misc]
    @property
    def SQLALCHEMY_DATABASE_URI(self) -> PostgresDsn:
        return MultiHostUrl.build(
            scheme="postgresql+psycopg",
            username=self.POSTGRES_USER,
            password=self.POSTGRES_PASSWORD,
            host=self.POSTGRES_SERVER,
            port=self.POSTGRES_PORT,
            path=self.POSTGRES_DB,
        )
    
    SUPERUSER_EMAIL: str
    SUPERUSER_PASSWORD: str
    USER_SIGNUP: bool = True

    # Email configuration
    MAIL_USERNAME: str
    MAIL_PASSWORD: str
    MAIL_FROM: str
    MAIL_PORT: int
    MAIL_SERVER: str
    MAIL_FROM_NAME: str
    MAIL_STARTTLS: bool = True
    MAIL_SSL_TLS: bool = False
    USE_CREDENTIALS: bool = True
    VALIDATE_CERTS: bool = True

    @computed_field  # type: ignore[misc]
    def MAIL_CONFIG(self) -> ConnectionConfig:
        return ConnectionConfig(
            MAIL_USERNAME=self.MAIL_USERNAME,
            MAIL_PASSWORD=self.MAIL_PASSWORD,
            MAIL_FROM=self.MAIL_FROM,
            MAIL_PORT=self.MAIL_PORT,
            MAIL_SERVER=self.MAIL_SERVER,
            MAIL_FROM_NAME=self.MAIL_FROM_NAME,
            MAIL_STARTTLS=self.MAIL_STARTTLS,
            MAIL_SSL_TLS=self.MAIL_SSL_TLS,
            USE_CREDENTIALS=self.USE_CREDENTIALS,
            VALIDATE_CERTS=self.VALIDATE_CERTS,
        )


settings = Settings()