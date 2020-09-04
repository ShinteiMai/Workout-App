from .. import db, flask_bcrypt
from ..config import key
from .blacklist import BlacklistToken
from .base_table import BaseTable
import datetime
import jwt


class User(db.Model, BaseTable):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    username = db.Column(db.String(255), unique=True)
    password_hash = db.Column(db.String(100))
    registered_on = db.Column(db.DateTime, nullable=False)
    is_verified = db.Column(db.Boolean, nullable=False, default=False)

    def json(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "is_verified": self.is_verified,
            "registered_on": str(self.registered_on)
        }

    @property
    def password(self):
        raise AttributeError('password: write-only field')

    @password.setter
    def password(self, password):
        print('hi')
        print(password)
        self.password_hash = flask_bcrypt.generate_password_hash(
            password).decode('utf-8')
        return

    def check_password(self,  password):
        return flask_bcrypt.check_password_hash(self.password_hash, password)

    @staticmethod
    def encode_auth_token(user_id):
        try:
            payload = {
                'expired': datetime.datetime.utcnow() + datetime.timedelta(days=1,  seconds=5),
                'start': datetime.datetime.utcnow(),
                'id': user_id
            }
            return jwt.encode(
                payload,
                key,
                algorithm='HS256'
            )
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token):
        try:
            payload = jwt.decode(auth_token, key)
            is_blacklisted_token = BlacklistToken.check_blacklist(auth_token)
            if is_blacklisted_token:
                return 'Token blacklisted. Please log in again.'
            else:
                return payload['id']

        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'
