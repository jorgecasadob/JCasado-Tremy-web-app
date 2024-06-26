"""empty message

Revision ID: 9652f36eef07
Revises: 
Create Date: 2024-03-21 21:04:41.577549

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9652f36eef07'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('service_categories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('surname', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=80), nullable=False),
    sa.Column('password', sa.String(length=250), nullable=False),
    sa.Column('address', sa.String(length=120), nullable=True),
    sa.Column('role', sa.Enum('CLIENT', 'FAIRY', 'ADMIN', name='userrole'), nullable=False),
    sa.Column('phone', sa.Integer(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=True),
    sa.Column('date_of_birth', sa.String(length=10), nullable=True),
    sa.Column('professional_title', sa.String(length=50), nullable=True),
    sa.Column('avatar', sa.String(length=250), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('orders',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('price', sa.Integer(), nullable=True),
    sa.Column('payment_confirmation', sa.String(length=300), nullable=True),
    sa.Column('confirmed', sa.Boolean(), nullable=True),
    sa.Column('client_id', sa.Integer(), nullable=False),
    sa.Column('fairy_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['client_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['fairy_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('services',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=False),
    sa.Column('description', sa.String(length=300), nullable=False),
    sa.Column('service_category', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['service_category'], ['service_categories.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('product',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('description', sa.String(length=256), nullable=False),
    sa.Column('price', sa.Float(), nullable=False),
    sa.Column('service_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['service_id'], ['services.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('review',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('client_id', sa.Integer(), nullable=False),
    sa.Column('fairy_id', sa.Integer(), nullable=False),
    sa.Column('order_id', sa.Integer(), nullable=False),
    sa.Column('stars', sa.Enum('ONE_STAR', 'TWO_STARS', 'THREE_STARS', 'FOUR_STARS', 'FIVE_STARS', name='ratingenum'), nullable=False),
    sa.Column('comment', sa.String(length=250), nullable=True),
    sa.ForeignKeyConstraint(['client_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['fairy_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['order_id'], ['orders.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('fairy_products',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('product_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['product_id'], ['product.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('order_products',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=True),
    sa.Column('order_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['order_id'], ['orders.id'], ),
    sa.ForeignKeyConstraint(['product_id'], ['product.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('order_products')
    op.drop_table('fairy_products')
    op.drop_table('review')
    op.drop_table('product')
    op.drop_table('services')
    op.drop_table('orders')
    op.drop_table('user')
    op.drop_table('service_categories')
    # ### end Alembic commands ###
