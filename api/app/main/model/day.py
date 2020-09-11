import uuid
from .. import db
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy_utils import *
from ..utils.generate_uuid import generate_uuid


class Day(db.Model):
    __tablename__ = "days"

    id = db.Column(UUID(as_uuid=True), primary_key=True,
                   default=generate_uuid, unique=True)
    name = db.Column(db.String())
    is_chosen = db.Column(db.Boolean())

    def __init__(self, name, is_chosen=False):
        self.name = name
        self.is_chosen
