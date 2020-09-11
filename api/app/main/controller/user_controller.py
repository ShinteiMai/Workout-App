from flask import request
from flask_restx import Resource, Namespace, fields, reqparse
from marshmallow import ValidationError

from ..model.user import UserSchema, AuthSchema
from ..service.user_service import UserService
from ..utils.error import AuthError
from ..utils.decorator import auth_required

user_service = UserService()
user_schema = UserSchema()
error = AuthError()

api = Namespace('user', description="User related operations")


@api.route('/register')
class Register(Resource):
    @api.doc('Create a new user')
    def post(self):
        body = request.get_json(force=True)
        try:
            user_schema.load(body)

            new_user = user_service.register(body["data"]["attributes"])
            data = user_schema.dump(new_user)["data"]
            return ({
                "data": data,
                "message": "Created a new user with the id of '{}'".format(new_user.id)
            }, 201)
        except ValidationError as err:
            error.validation_error(err.messages["errors"])


@api.route('/login')
class Login(Resource):
    @api.doc("Login as an user")
    def post(self):
        body = request.get_json(force=True)
        try:
            AuthSchema().load(body)

            auth = user_service.login(body)
            data = user_schema.dump(auth["user"])["data"]
            data["jwt"] = auth["jwt"]
            return ({
                "data": data,
                "message": "Successfully login as an user with the id of '{}'".format(auth["user"].id)
            }, 200)
        except ValidationError as err:
            error.validation_error(err.messages)


@api.route('/logout')
class Logout(Resource):
    @api.doc("Logout as an user")
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('Authorization', location='headers')
        token = parser.parse_args()["Authorization"]
        if token:
            user = user_service.logout(token.split(" ")[1])
            data = user_schema.dump(user)["data"]
            return ({
                "data": data,
                "message": "Successfully logged out as an user with the id of '{}'".format(user.id)
            }, 200)
        else:
            error.token_not_provided()


@api.route("")
class Users(Resource):
    @api.doc('Fetch a list of users')
    def get(self):
        limit = request.args.get('limit') or ''
        sort_by = request.args.get('sort_by') or ''
        username_contains = request.args.get('username_contains') or ''

        users = user_service.get_users(limit, sort_by, username_contains)
        data = user_schema.dump(users, many=True)["data"]
        return ({
            "data": data,
            "message": "Fetched a list of users"
        }, 200)


@api.route('/<id>')
@api.param('id', 'User ID')
class User(Resource):
    @api.doc('Fetch a single user with the specified id')
    def get(self, id):
        user = user_service.get_user(id)
        data = user_schema.dump(user)["data"]
        print(data)
        return ({
            "data": data,
            "message": "Fetched an user with the id of '{}'".format(id)
        }, 200)

    @api.doc('Delete a single user with the specified id')
    def delete(self, id):
        user = user_service.delete_user(id)
        data = user_schema.dump(user)["data"]
        return ({
            "data": data,
            "message": "Deleted an user with the id of '{}'".format(id)
        }, 200)

    @api.doc('Update a single user with the specified id')
    def put(self, id):
        body = request.get_json(force=True)
        try:
            user_schema.load(body)

            user = user_service.update_user(id, body["data"]["attributes"])
            data = user_schema.dump(user)["data"]
            return ({
                "data": data,
                "message": "Updated an user with the id of '{}'".format(id)
            })
        except ValidationError as err:
            error.validation_error(err.messages["errors"])
