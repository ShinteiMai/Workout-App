from db import db
from sqlalchemy_utils import *
from .base_table import BaseTable
# from .utils.types import UUID, id_column_name
from sqlalchemy.dialects.postgresql import UUID
from ..utils.generate_uuid import generate_uuid
import uuid


class ExerciseModel(db.Model, BaseTable):
    __tablename__ = 'exercises'
    id = db.Column(UUID(as_uuid=True),
                   primary_key=True, default=generate_uuid, unique=True)
    name = db.Column(db.String(255), nullable=False)
    sets = db.Column(db.Integer, nullable=False)
    reps = db.Column(db.Integer, nullable=False)

    def __init__(self, name, sets, reps):
        self.name = name
        self.sets = sets
        self.reps = reps

    def json(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'sets': self.sets,
            'reps': self.reps
        }
