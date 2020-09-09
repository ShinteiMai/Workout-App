import uuid
import datetime

from app.main.utils.response import Response
from app.main.utils.error import AuthError
from app.main import db
from app.main.model.user import User

from flask_jwt_extended import (
    get_raw_jwt,
    create_access_token,
    create_refresh_token,
    get_jwt_identity
)

error = AuthError()


class UserService(Response):
    @staticmethod
    def get_users():
        try:
            users = list(map(lambda x: x.json(), User.query.all()))
        except:
            error.server_error()
        return users

    @staticmethod
    def get_user(id):
        try:
            user = User.query.filter_by(id=id).first()
        except:
            error.server_error()
        return user

    @staticmethod
    def register(data):
        user = User.query.filter_by(email=data['email']).first()
        if not user:
            new_user = User(**data)
            try:
                new_user.save()
            except:
                error.server_error()
            return new_user
        else:
            error.user_already_exists()

    @staticmethod
    def login(data):
        try:
            user = User.query.filter_by(email=data['email']).first()
        except:
            error.user_not_found()

        if user and user.check_password(data['password']):
            access_token = User.encode_auth_token(user.id)
            return {
                'user': user.json(),
                'jwt': access_token,
            }
        else:
            error.auth_is_invalid()

    @staticmethod
    def logout(self, token):
        if token:
            pass
        else:
            pass

    # @static_method
    # def generate_token(self, user):
    #     try:
    #         auth_token = User.encode_auth_token()
    #         return user
    #     except Exception as e:
    #         return user
