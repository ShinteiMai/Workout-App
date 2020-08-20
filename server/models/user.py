from db import db
from sqlalchemy_utils import UUIDType
from passlib.hash import pbkdf2_sha256
import uuid
import os


def generate_uuid():
    return str(uuid.uuid4())


class UserModel(db.Model):
    __tablename__ = 'users'
    id = db.Column(UUIDType(binary=False),
                   primary_key=True, default=generate_uuid)
    email = db.Column(db.String(255))
    password = db.Column(db.Text)

    def __init__(self, email, password):
        self.email = email
        self.password = pbkdf2_sha256.hash(password)

    def json(self):
        return {
            'id': str(self.id),
            'email': self.email
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def compare_password(self, password):
        return pbkdf2_sha256.verify(password, self.password)

    @classmethod
    def find(cls):
        return cls.query.all()

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()
