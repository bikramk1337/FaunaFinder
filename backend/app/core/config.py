from typing import Annotated, Any
import hvac
import boto3
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

    # Vault Config
    VAULT_TOKEN: str

    # Email configuration
    MAIL_USERNAME: str = ""
    MAIL_PASSWORD: str = ""
    MAIL_PORT: int = 0
    MAIL_SERVER: str = ""
    MAIL_STARTTLS: bool = True
    MAIL_SSL_TLS: bool = False
    USE_CREDENTIALS: bool = True
    VALIDATE_CERTS: bool = True

    @computed_field  # type: ignore[misc]
    def MAIL_CONFIG(self) -> ConnectionConfig:
        return ConnectionConfig(
            MAIL_USERNAME=self.MAIL_USERNAME,
            MAIL_PASSWORD=self.MAIL_PASSWORD,
            MAIL_FROM=self.MAIL_USERNAME,
            MAIL_PORT=self.MAIL_PORT,
            MAIL_SERVER=self.MAIL_SERVER,
            MAIL_FROM_NAME=self.PROJECT_NAME,
            MAIL_STARTTLS=self.MAIL_STARTTLS,
            MAIL_SSL_TLS=self.MAIL_SSL_TLS,
            USE_CREDENTIALS=self.USE_CREDENTIALS,
            VALIDATE_CERTS=self.VALIDATE_CERTS,
        )

    # Boto3 configuration
    AWS_ACCESS_KEY_ID: str = ""
    AWS_SECRET_ACCESS_KEY: str = ""
    AWS_DEFAULT_REGION: str = ""
    S3_BUCKET_NAME: str = ""

    @property
    def s3_client(self):
        return boto3.client(
            "s3",
            aws_access_key_id=self.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=self.AWS_SECRET_ACCESS_KEY,
            region_name=self.AWS_DEFAULT_REGION
        )

    def __init__(self):
        super().__init__()

        # Initialize Vault client
        self.vault_client = hvac.Client(url="http://vault:8200")
        self.vault_client.token = self.VAULT_TOKEN

        # Retrieve secrets from Vault
        secrets = self.vault_client.secrets.kv.v2.read_secret_version(path="ff-secrets")["data"]["data"]

        # Set email configuration from Vault secrets
        self.MAIL_USERNAME = secrets.get("MAIL_USERNAME", "")
        self.MAIL_PASSWORD = secrets.get("MAIL_PASSWORD", "")
        self.MAIL_PORT = secrets.get("MAIL_PORT", 0)
        self.MAIL_SERVER = secrets.get("MAIL_SERVER", "")

        # Set AWS configuration from Vault secrets
        self.AWS_ACCESS_KEY_ID = secrets.get("AWS_ACCESS_KEY_ID", "")
        self.AWS_SECRET_ACCESS_KEY = secrets.get("AWS_SECRET_ACCESS_KEY", "")
        self.AWS_DEFAULT_REGION = secrets.get("AWS_DEFAULT_REGION", "")
        self.S3_BUCKET_NAME = secrets.get("S3_BUCKET_NAME", "")

settings = Settings()