import uuid
import datetime
import jwt

from app.main.utils.response import Response
from app.main.utils.error import AuthError
from app.main import db
from app.main.model.user import User
from app.main.model.blacklist import BlacklistToken

from flask_jwt_extended import (
    get_raw_jwt,
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
    decode_token
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

    @ staticmethod
    def check_auth(req):
        # 1. Get the JWT token
        auth_header = req.headers.get('Authorization')
        # token = req.headers.get('Authorization')
        if auth_header:
            token = auth_header.split(" ")[1]
            print(token)
            # 2. Decode the JWT token -> returns back user id
            user_id = User.decode_auth_token(token)
            print(user_id)
            if user_id:
                # 3. Check if the user really exists
                user = User.find_by_id(user_id)
                print(user)
                return user
            # 4. Not authenticated error
            error.auth_is_invalid()
        # 5. No token provided error
        error.token_not_provided()

    # @static_method
    # def generate_token(self, user):
    #     try:
    #         auth_token = User.encode_auth_token()
    #         return user
    #     except Exception as e:
    #         return user
    @staticmethod
    def logout(token):
        if token:
            user_id = User.decode_auth_token(token)
            try:
                user = User.find_by_id(user_id)
                print(user)
                if user:
                    try:
                        print("test")
                        new_blacklist = BlacklistToken({
                            'token': token,
                        })
                        print(new_blacklist)
                        new_blacklist.save()
                    except:
                        pass
            except:
                pass
        else:
            pass
