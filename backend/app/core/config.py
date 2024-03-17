from typing import Annotated, Any

from pydantic import (
    AnyUrl,
    BeforeValidator,
    PostgresDsn,
    computed_field,
)
from pydantic_core import MultiHostUrl
from pydantic_settings import BaseSettings, SettingsConfigDict


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

    PROJECT_NAME: str
    POSTGRES_SERVER: str
    POSTGRES_PORT: int 
    POSTGRES_DB: str 
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str

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


settings = Settings()