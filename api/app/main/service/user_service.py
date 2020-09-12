import uuid
import datetime
import jwt
from sqlalchemy.exc import SQLAlchemyError

from app.main.utils.response import Response
from app.main.utils.error import AuthError
from app.main import db, DEFAULT_LIMIT
from app.main.model.user import User, UserSchema
from app.main.model.blacklist import BlacklistToken

user_schema = UserSchema()
Error = AuthError()


class UserService(Response):
    @staticmethod
    def get_users(limit, sort_by, username_contains):
        # sort_by is still hardcoded we need to find a nice way
        # to do this thing
        try:
            search = "%{}%".format(username_contains)
            query = User.query.filter(User.username.like(
                search)) if username_contains else User.query
            users = query.order_by(User.username).limit(
                int(limit) if limit else DEFAULT_LIMIT).all()
            return users
        except SQLAlchemyError as err:
            Error.server_error()

    @staticmethod
    def get_user(id):
        try:
            user = User.query.filter(User.id == id).first()
            if not user:
                Error.user_not_found(id)
            return user
        except SQLAlchemyError as err:
            Error.server_error()

    @staticmethod
    def register(data):
        user = User.query.filter_by(email=data['email']).first()
        if not user:
            new_user = User(**data)
            try:
                new_user.add()
            except SQLAlchemyError as err:
                Error.server_error()
            return new_user
        else:
            Error.user_already_exists()

    @staticmethod
    def update_user(id, data):
        try:
            user = User.query.filter(User.id == id).first()
            if user:
                user.email = data["email"]
                user.username = data["username"]
                user.password = User.hash_password(data["password"])

                user.commit()
                return user
            else:
                Error.user_not_found(id)
        except SQLAlchemyError as err:
            Error.server_error()

    @staticmethod
    def delete_user(id):
        try:
            user = User.query.filter(User.id == id).first()
            if not user:
                Error.user_not_found(id)
            user.delete()
        except SQLAlchemyError as err:
            Error.server_error()
        return user

    @staticmethod
    def login(data):
        try:
            user = User.query.filter_by(email=data['email']).first()
            if not user:
                Error.user_not_found(data["email"])
        except SQLAlchemyError as err:
            Error.user_not_found()

        if user and user.check_password(data['password']):
            access_token = User.encode_auth_token(user.id)
            return {
                'user': user,
                'jwt': access_token,
            }
        else:
            Error.auth_is_invalid()

    @staticmethod
    def check_auth(req):
        auth_header = req.headers.get('Authorization')
        if auth_header:
            token = auth_header.split(" ")[1]
            user_id = User.decode_auth_token(token)
            if user_id:
                user = User.find_by_id(user_id)
                return user
            else:
                Error.auth_is_invalid()
        else:
            Error.token_not_provided()

    @staticmethod
    def logout(token):
        user_id = User.decode_auth_token(token)
        if not user_id:
            Error.token_is_blacklisted()
        try:
            user = User.find_by_id(user_id)
            if not user:
                Error.user_not_found(user_id)
        except SQLAlchemyError as err:
            Error.server_error()

        blacklist = BlacklistToken(token=token)
        try:
            blacklist.add()
        except SQLAlchemyError as err:
            Error.server_error()
        return user
