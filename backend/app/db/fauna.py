from typing import Optional, TYPE_CHECKING

from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from app.db.models import User

from app.db.models import TimestampMixin

# SQLModel Classes for Fauna Lookup table
class FaunaBase(SQLModel):
    label: str
    common_name: str | None = None
    other_names: str | None = None
    description: str | None = None
    
    # Scientific Classification
    scientific_name: str | None = None
    class_name: str | None = None
    order: str | None = None
    family: str | None = None
    
    # Other details
    size: str | None = None
    habitat: str | None = None
    diet: str | None = None
    breeding: str | None = None
    geographic_range: str | None = None
    other_info: str | None = None

class FaunaUpdate(FaunaBase):
    common_name: str | None = None
    other_names: str | None = None
    description: str | None = None
    
    # Scientific Classification
    scientific_name: str | None = None
    class_name: str | None = None
    order: str | None = None
    family: str | None = None
    
    # Other details
    size: str | None = None
    habitat: str | None = None
    diet: str | None = None
    breeding: str | None = None
    geographic_range: str | None = None
    other_infp: str | None = None

class FaunaOut(FaunaBase, SQLModel):
    id: int

class FaunasOut(SQLModel):
    data: list[FaunaOut]
    count: int

class ClassificationBase(SQLModel):
    image_url: str
    prediction: str

class ClassificationOut(ClassificationBase):
    id: int
    user_id: int

class ClassificationsOut(SQLModel):
    data: list[ClassificationOut]
    count: int

# Database Model
class Fauna(FaunaBase, TimestampMixin, table=True):
    id: int = Field(default=None, primary_key=True)

class ClassificationHistory(ClassificationBase, TimestampMixin, table=True):
    id: int = Field(default=None, primary_key=True)
    user_id: int | None = Field(default=None, foreign_key="user.id", nullable=False)
    user: Optional["User"] = Relationship(back_populates="classification_history")
