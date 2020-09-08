import uuid
import datetime

from app.main.utils.response import Response
# from app.main.utils.error import Error
from app.main import db
from app.main.model.user import User

from flask_jwt_extended import (
    get_raw_jwt,
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity
)


class UserService(Response):

    def get_users(self):
        users = list(map(lambda x: x.json(), User.query.all()))
        return self.json(data=users, message="Retrieved users successfully", status_code=200)

    @jwt_required
    def get_user(self, id):
        user = User.query.filter_by(id=id).first()
        return self.json(data=user, message="Retrieved user successfully", status_code=200)

    def register(self, data):
        print(data)
        user = User.query.filter_by(email=data['email']).first()
        if not user:
            new_user = User(
                email=data['email'],
                username=data['username'],
                password=data['password'],
            )
            new_user.save()
            return new_user.json()
        else:
            return self.json(data="", message="User Already Exists", status_code=409)

    def login(self, data):

        try:
            user = User.query.filter_by(email=data['email']).first()
        except:
            return self.json(data="", message="An error occurred during finding the user", status_code=401)

        if user and user.check_password(data['password']):
            access_token = create_access_token(identity=user.id, fresh=True)
            refresh_token = create_refresh_token(user.id)

            payload = {
                'user': user.json(),
                'jwt': access_token,
                'refresh_token': refresh_token
            }

            return self.json(data=payload, message="Login Successful", status_code=200)

        return self.json(data="", message="Email address not found", status_code=404)

    @jwt_required
    def logout(self, data):
        jti = get_raw_jwt()['jti']

        return ({
            "message": "Successfully logged out"
        })

    def generate_token(self, user):
        try:
            auth_token = User.encode_auth_token()
            return self.json(data=user, message="Retrieved users successfully", status_code=200)
        except Exception as e:
            return self.json(data=user, message="Failed", status_code=401)
