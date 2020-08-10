from sqlalchemy.dialects.postgresql import UUID
from db import db
import uuid


class RoutineModel(db.model):
    __tablename__ = "routines"
    id = db.Column(UUID(as_uuid=True), primary_key=True,
                   default=uuid.uuid4, unique=True, nullable=False)
    title = db.Column(db.String(255))
    desc = db.Column(db.Text)

    def __init__(self, title, desc):
        self.title = title
        self.desc = desc

    def json(self):
        return {
            'id': self.id,
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
