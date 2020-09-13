import uuid
import datetime
import jwt
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy_utils import *
from ..utils.generate_uuid import generate_uuid

from marshmallow_jsonapi import Schema, fields
from marshmallow import validate

from .. import db, flask_bcrypt
from ..config import key
from .blacklist import BlacklistToken
from .base_table import BaseTable

from .day import Day

exercise_identifier = db.Table('exercise_identifier',
                               db.Column('routine_id', UUID(as_uuid=True), db.ForeignKey(
                                   'routines.id')),
                               db.Column('exercise_id', UUID(as_uuid=True), db.ForeignKey(
                                   'exercises.id'))
                               )

day_identifier = db.Table('day_identifier',
                          db.Column('routine_id', UUID(as_uuid=True), db.ForeignKey(
                                    'routines.id')),
                          db.Column('day_id', UUID(as_uuid=True), db.ForeignKey(
                                    "days.id"))
                          )


class Routine(db.Model, BaseTable):
    __tablename__ = "routines"
    id = db.Column(UUID(as_uuid=True),
                   primary_key=True, default=generate_uuid, unique=True)
    title = db.Column(db.String(255))
    description = db.Column(db.Text)
    duration = db.Column(db.Integer)  # in seconds
    # frequency, monday=True, tuesday=True, wednesday=False, ..., sunday=True (create a db model that accomodates this behaviour)
    # difficulty = Enum -> easy, medium, hard (for now)
    # creator = relationship with user

    exercises = db.relationship(
        'Exercise', secondary=exercise_identifier, lazy='dynamic')

    frequency = db.relationship(
        'Day', secondary=day_identifier, lazy="dynamic")

    def __init__(self, title, description, duration):
        self.title = title
        self.description = description
        self.duration = duration


class RoutineSchema(Schema):
    id = fields.UUID(dump_only=True)
    title = fields.String(required=True, validate=validate.Length(
        max=255), error="Title of a routine must be under 255 characters")
    description = fields.String()
    duration = fields.Integer()
    exercises = fields.Relationship(
        many=True,
        include_resource_linkage=True,
        type_='exercise',
        schema='ExerciseSchema'
    )
    # frequency
    # difficulty
    # creator

    class Meta:
        type_ = 'routine'
