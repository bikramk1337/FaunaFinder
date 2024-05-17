from typing import List, Optional
from pydantic import EmailStr
from sqlmodel import Field, SQLModel

# Class for Email Schema
class EmailSchema(SQLModel):
    subject: str
    recipients: List[EmailStr]
    body: str
    cc: Optional[List[EmailStr]] = Field(default_factory=list)
    bcc: Optional[List[EmailStr]] = Field(default_factory=list)
    attachments: Optional[List[str]] = Field(default_factory=list)