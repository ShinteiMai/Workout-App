from sqlalchemy_utils import UUIDType
from db import db
import uuid


def generate_uuid():
    return str(uuid.uuid4())


class RoutineModel(db.Model):
    __tablename__ = "routines"
    id = db.Column(UUIDType(binary=False),
                   primary_key=True, default=generate_uuid)
    title = db.Column(db.String(255))
    desc = db.Column(db.Text)

    def __init__(self, title, desc):
        self.title = title
        self.desc = desc

    def json(self):
        return {
            'id': str(self.id),
            'title': self.title,
            'desc': self.desc
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

    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()
