import uuid
import datetime
import jwt
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy_utils import *
from marshmallow_jsonapi import Schema, fields
from marshmallow import validate
from marshmallow import Schema as BaseSchema

from .. import db, flask_bcrypt
from ..config import key
from .blacklist import BlacklistToken
from .base_table import BaseTable
from ..utils.generate_uuid import generate_uuid
from ..utils.error import AuthError

error = AuthError()


class User(db.Model, BaseTable):
    __tablename__ = "users"

    id = db.Column(UUID(as_uuid=True),
                   primary_key=True, default=generate_uuid)
    googleId = db.Column(db.String(255), unique=True, nullable=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    username = db.Column(db.String(255), nullable=True)
    password_hash = db.Column(db.String(100), nullable=True)
    registered_on = db.Column(
        db.DateTime, nullable=False, default=datetime.datetime.utcnow())
    # confirmed_at: datetime
    photoUrl = db.Column(db.String, nullable=True)
    is_verified = db.Column(db.Boolean, nullable=False)
    #current_ip_address: ipaddress
    #last_ip_address: ipaddress
    #last_login_at: datetime
    #current_login_at: datetime
    #active: boolean
    # google id for google auth

    # def __init__(self, email, username, password):
    def __init__(self, email, is_verified=False, username=None, password=None, googleId=None, photoUrl=None):
        self.email = email
        self.is_verified = is_verified
        if username:
            self.username = username
        if password:
            self.password = password
        if googleId:
            self.googleId = googleId
        if photoUrl:
            self.photoUrl = photoUrl

    @property
    def password(self):
        raise AttributeError('password: write-only field')

    @password.setter
    def password(self, password):
        self.password_hash = User.hash_password(password)

    def check_password(self,  password):
        return flask_bcrypt.check_password_hash(self.password_hash, password)

    @staticmethod
    def hash_password(password):
        return flask_bcrypt.generate_password_hash(password).decode('utf-8')

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

    @staticmethod
    def decode_auth_token(auth_token):
        try:
            payload = jwt.decode(auth_token, key)
            is_blacklisted_token = BlacklistToken.check_blacklist(auth_token)
            if is_blacklisted_token:
                error.token_is_blacklisted()
            else:
                return payload['id']

        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'


class UserSchema(Schema):
    id = fields.UUID(dump_only=True)
    email = fields.Email(required=True, error="Email can't be undefined")
    username = fields.String(required=True, validate=validate.Length(
        min=3), error="Username must be 3 characters minimum")
    password = fields.String(required=True, load_only=True, validate=validate.Length(
        min=3), error="Password must be 3 characters minimum")

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


class AuthSchema(Schema):
    id = fields.UUID(dump_only=True)
    email = fields.Email(required=True, error="Provide a valid email address")
    password = fields.String(required=True, validate=validate.Length(
        min=3), error="Username must be minimum 3 characters")

    class Meta:
        type_ = "auth"
