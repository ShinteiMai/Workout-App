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


class User(db.Model, BaseTable):
    __tablename__ = "user"

    id = db.Column(UUID(as_uuid=True),
                   primary_key=True, default=generate_uuid)
    email = db.Column(db.String(255), unique=True, nullable=False)
    username = db.Column(db.String(255), unique=True)
    password_hash = db.Column(db.String(100))
    registered_on = db.Column(
        db.DateTime, nullable=False, default=datetime.datetime.utcnow())
    # confirmed_at: datetime
    is_verified = db.Column(db.Boolean, nullable=False, default=False)
    #current_ip_address: ipaddress
    #last_ip_address: ipaddress
    #last_login_at: datetime
    #current_login_at: datetime
    #active: boolean
    # google id or idk

    def __init__(self, email, username, password):
        self.email = email
        self.username = username
        self.password = password

    def json(self):
        return {
            "id": str(self.id),
            "email": self.email,
            "username": self.username,
            "registered_on": str(self.registered_on),
            "is_verified": self.is_verified
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
                'expired': str(datetime.datetime.utcnow() + datetime.timedelta(days=1,  seconds=5)),
                'start': str(datetime.datetime.utcnow()),
                'id': str(user_id)
            }
            encoded = jwt.encode(
                payload,
                key,
                algorithm='HS256'
            )
            decoded = encoded.decode('utf-8')
            return decoded
        except Exception as e:
            return e

    @ staticmethod
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


class UserSchema(Schema):
    id = fields.UUID(dump_only=True)
    email = fields.Email(required=True)
    username = fields.String(
        required=True, validate=validate.Range(min=2, max=255))
    password = fields.String(
        load_only=True, required=True, validate=validate.Range(min=3, max=255))

    def get_link(self, data, is_many):
        if is_many:
            self._link = "/user"
        else:
            self._link = "/user/{}".format(id)
        return {
            "link": self._link
        }

    class Meta:
        type_ = 'user'
