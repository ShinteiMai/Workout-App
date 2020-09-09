from .. import db, flask_bcrypt
from ..config import key
from .blacklist import BlacklistToken
from .base_table import BaseTable
# from .utils.types import UUID, id_column_name
from sqlalchemy.dialects.postgresql import UUID
from ..utils.generate_uuid import generate_uuid
from sqlalchemy_utils import *
import uuid
import datetime
import jwt

exercise_identifier = db.Table('exercise_identifier',
                               db.Column('routine_id', UUID(as_uuid=True), db.ForeignKey(
                                   'routines.id')),
                               db.Column('exercise_id', UUID(as_uuid=True), db.ForeignKey(
                                   'exercises.id'))
                               )


class RoutineModel(db.Model, BaseTable):
    __tablename__ = "routines"
    id = db.Column(UUID(as_uuid=True),
                   primary_key=True, default=generate_uuid, unique=True)
    title = db.Column(db.String(255))
    description = db.Column(db.Text)
    exercises = db.relationship(
        'ExerciseModel', secondary=exercise_identifier, lazy='dynamic')

    def __init__(self, title, description, exercises):
        self.title = title
        self.description = description

    def json(self):
        return {
            'id': str(self.id),
            'title': self.title,
            'description': self.description,
            # 'exercises': list(map(lambda x: x.json(), self.exercises.all()))
        }
