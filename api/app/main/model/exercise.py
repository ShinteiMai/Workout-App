import uuid
import datetime
import jwt

from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy_utils import *

from marshmallow_jsonapi import Schema, fields
from marshmallow import validate

from .. import db, flask_bcrypt
from ..config import key
from .blacklist import BlacklistToken
from .base_table import BaseTable
from ..utils.generate_uuid import generate_uuid


class Exercise(db.Model, BaseTable):
    __tablename__ = 'exercises'
    id = db.Column(UUID(as_uuid=True),
                   primary_key=True, default=generate_uuid, unique=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String)
    difficulty = db.Column(db.String)
    sets = db.Column(db.Integer, nullable=False)
    reps = db.Column(db.Integer, nullable=False)
    experience_per_rep = db.Column(db.Integer, nullable=False)
    # creator -> relationship with user

    def __init__(self, title, description, difficulty, sets, reps, experience_per_rep):
        self.title = title
        self.description = description
        self.difficulty = difficulty
        self.sets = sets
        self.reps = reps
        self.experience_per_rep = experience_per_rep


class ExerciseSchema(Schema):
    id = fields.UUID(dump_only=True)
    title = fields.String(required=True)
    description = fields.String()
    difficulty = fields.String()
    reps = fields.Integer()
    sets = fields.Integer()
    experience_per_rep = fields.Integer()

    class Meta:
        type_ = "exercise"
