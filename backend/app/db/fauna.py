from typing import Optional, TYPE_CHECKING

from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from app.db.models import User

from app.db.models import TimestampMixin

# SQLModel Classes for Fauna Lookup table
class FaunaBase(SQLModel):
    image_label: int | None = None
    common_name: str
    description: str | None = None
    # Scientific Classification
    scientific_name: str
    family: str | None = None
    fauna_class: str | None = None
    fauna_infra_class: str | None = None
    # Other details
    conservation_status: str | None = None
    habitat: str | None = None
    diet: str | None = None
    lifespan: int | None = None
    geographic_range: str | None = None
    fun_fact: str | None = None

class FaunaUpdate(FaunaBase):
    common_name: str | None = None
    description: str | None = None
    scientific_name: str | None = None
    family: str | None = None
    fauna_class: str | None = None
    fauna_infra_class: str | None = None
    conservation_status: str | None = None
    habitat: str | None = None
    diet: str | None = None
    lifespan: int | None = None
    geographic_range: str | None = None
    fun_fact: str | None = None

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

# Database Model
class Fauna(FaunaBase, TimestampMixin, table=True):
    id: int = Field(default=None, primary_key=True)

class ClassificationHistory(ClassificationBase, TimestampMixin, table=True):
    id: int = Field(default=None, primary_key=True)
    user_id: int | None = Field(default=None, foreign_key="user.id", nullable=False)
    user: Optional["User"] = Relationship(back_populates="classification_history")
