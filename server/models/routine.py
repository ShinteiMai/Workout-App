from db import db
from sqlalchemy_utils import UUIDType
import uuid


def generate_uuid():
    return str(uuid.uuid4())


exercise_identifier = db.Table('exercise_identifier',
                               db.Column('routine_id', UUIDType(binary=False), db.ForeignKey(
                                   'routines.id')),
                               db.Column('exercise_id', UUIDType(binary=False), db.ForeignKey(
                                   'exercises.id'))
                               )


class RoutineModel(db.Model):
    __tablename__ = "routines"
    id = db.Column(UUIDType(binary=False),
                   primary_key=True, default=generate_uuid, unique=True)
    title = db.Column(db.String(255))
    description = db.Column(db.Text)
    exercises = db.relationship('ExerciseModel', secondary=exercise_identifier)

    def __init__(self, title, description, exercises):
        self.title = title
        self.description = description
        self.exercises = exercises

    def json(self):
        return {
            'id': str(self.id),
            'title': self.title,
            'desc': self.description,
            'exercises': list(map(lambda x: x.json(), self.exercises.all()))
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find(cls):
        return cls.query.all()

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()
