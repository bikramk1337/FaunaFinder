"""Update Fauna class with new columns

Revision ID: be88831d9c69
Revises: 1b31344caad0
Create Date: 2024-05-15 16:59:15.022122

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision: str = 'be88831d9c69'
down_revision: Union[str, None] = '1b31344caad0'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('fauna', sa.Column('label', sqlmodel.sql.sqltypes.AutoString(), nullable=False))
    op.add_column('fauna', sa.Column('other_names', sqlmodel.sql.sqltypes.AutoString(), nullable=True))
    op.add_column('fauna', sa.Column('class_name', sqlmodel.sql.sqltypes.AutoString(), nullable=True))
    op.add_column('fauna', sa.Column('order', sqlmodel.sql.sqltypes.AutoString(), nullable=True))
    op.add_column('fauna', sa.Column('size', sqlmodel.sql.sqltypes.AutoString(), nullable=True))
    op.add_column('fauna', sa.Column('breeding', sqlmodel.sql.sqltypes.AutoString(), nullable=True))
    op.add_column('fauna', sa.Column('other_info', sqlmodel.sql.sqltypes.AutoString(), nullable=True))
    op.alter_column('fauna', 'common_name',
               existing_type=sa.VARCHAR(),
               nullable=True)
    op.alter_column('fauna', 'scientific_name',
               existing_type=sa.VARCHAR(),
               nullable=True)
    op.drop_column('fauna', 'fauna_class')
    op.drop_column('fauna', 'image_label')
    op.drop_column('fauna', 'fun_fact')
    op.drop_column('fauna', 'fauna_infra_class')
    op.drop_column('fauna', 'conservation_status')
    op.drop_column('fauna', 'lifespan')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('fauna', sa.Column('lifespan', sa.INTEGER(), autoincrement=False, nullable=True))
    op.add_column('fauna', sa.Column('conservation_status', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('fauna', sa.Column('fauna_infra_class', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('fauna', sa.Column('fun_fact', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('fauna', sa.Column('image_label', sa.INTEGER(), autoincrement=False, nullable=True))
    op.add_column('fauna', sa.Column('fauna_class', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.alter_column('fauna', 'scientific_name',
               existing_type=sa.VARCHAR(),
               nullable=False)
    op.alter_column('fauna', 'common_name',
               existing_type=sa.VARCHAR(),
               nullable=False)
    op.drop_column('fauna', 'other_info')
    op.drop_column('fauna', 'breeding')
    op.drop_column('fauna', 'size')
    op.drop_column('fauna', 'order')
    op.drop_column('fauna', 'class_name')
    op.drop_column('fauna', 'other_names')
    op.drop_column('fauna', 'label')
    # ### end Alembic commands ###
