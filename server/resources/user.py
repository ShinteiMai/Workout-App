from flask_restful import Resource, reqparse
from models.user import UserModel
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity
)


class Users(Resource):
    def get(self):
        return ({
            'users': list(map(lambda x: x.json(), UserModel.find()))
        })


class User(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id',
                            type=str,
                            required=True,
                            help="user id must be specified"
                            )
        data = parser.parse_args()

        try:
            user = UserModel.find_by_id(data.id)
        except:
            return ({
                "message": "An error occurred during fetching the user"
            }, 500)

        if user:
            return user.json(), 200

        return ({
            "message": "User was not found"
        }, 404)


class Login(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email',
                            type=str,
                            required=True,
                            help="You must specify the email address"
                            )
        parser.add_argument('password',
                            type=str,
                            required=True,
                            help="You must specify the password"
                            )
        data = parser.parse_args()
        try:
            user = UserModel.find_by_email(data.email)
        except:
            return ({
                "message": "An error occurred during finding the user"
            }, 500)

        if user and user.compare_password(data.password):
            access_token = create_access_token(identity=user.id, fresh=True)
            refresh_token = create_refresh_token(user.id)

            return ({
                'user': user.json(),
                'jwt': access_token,
                'refresh_token': refresh_token
            }, 200)

        return ({
            "message": "Email address not found"
        }, 404)


class Register(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email',
                            type=str,
                            required=True,
                            help="You must specify the email address"
                            )
        parser.add_argument('password',
                            type=str,
                            required=True,
                            help="You must specify the password"
                            )

        data = parser.parse_args()

        if UserModel.find_by_email(data.email):
            return ({
                "message": "An user with the email of '{}' already exists".format(data.email)
            }, 400)
        user = UserModel(**data)

        try:
            user.save()
        except:
            return ({
                "message": "An error occurred during creating an account"
            }, 500)

        return user.json(), 201


class Me(Resource):
    @jwt_required
    def post(self):
        user_id = get_jwt_identity()
        try:
            user = UserModel.find_by_id(user_id)
        except:
            return ({
                "message": "An error occurred during finding the user with id of {}".format(user_id)
            }, 500)

        return user.json(), 200
