import uuid
import datetime

from app.main.utils.response import Response
# from app.main.utils.error import Error
from app.main import db
from app.main.model.user import User


class UserService(Response):
    def create_user(self, data):
        user = User.query.filter_by(email=data['email']).first()
        if not user:
            print('asd4')
            print(data)
            print(datetime.datetime.utcnow())
            new_user = User(
                email=data['email'],
                username=data['username'],
                password=data['password'],
                registered_on=datetime.datetime.utcnow()
            )
            print('asd5')
            new_user.save()
            print(new_user)
            return new_user.json()
        else:
            return self.json("", "asd", 409)
            # return self.UserAlreadyExists()

    def get_users(self):
        print('asd2')
        users = list(map(lambda x: x.json(), User.query.all()))
        return users
        # return {"test": "test"}
        # return json(data=users, message="Retrieved users successfully", status_code=200)

    def get_user(self, id):
        user = User.query.filter_by(id=id).first()
        return json(data=user, message="Retrieved user successfully", status_code=200)

    def generate_token(self, user):
        try:
            auth_token = User.encode_auth_token()
            return json(data=users, message="Retrieved users successfully", status_code=200)
        except Exception as e:
            return json(data=users, message="Failed", status_code=401)
