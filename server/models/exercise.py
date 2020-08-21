from db import db
from sqlalchemy_utils import UUIDType
import uuid


def generate_uuid():
    return str(uuid.uuid4())


class ExerciseModel(db.Model):
    __tablename__ = 'exercises'
    id = db.Column(UUIDType(binary=False),
                   primary_key=True, default=generate_uuid, unique=True)
    name = db.Column(db.String(255))
    sets = db.Column(db.Integer)
    reps = db.Column(db.Integer)

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
