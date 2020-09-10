from flask import request
from flask_restx import Resource, Namespace, fields, reqparse

from ..service.user_service import UserService
from ..utils.decorator import auth_required
from flask_jwt_extended import jwt_required

user_service = UserService()

api = Namespace('user', description="User related operations")

# Response Models
_userModel = api.model('user', {
    'id': fields.String(required=True, description="User ID"),
    'email': fields.String(required=True, description="Email Address"),
    'username': fields.String(required=True, description="Username"),
    'registered_on': fields.String(required=True, description="Registered at"),
    'is_verified': fields.Boolean(required=True, description="User Verificiation Stats")
})

# Response Objects
_usersResponse = api.model('usersResponse', {
    'users': fields.Nested(_userModel),
    'message': fields.String(required=True, description="message")
})

_userResponse = api.model('userResponse', {
    'user': fields.Nested(_userModel),
    'message': fields.String(required=True, description="message")
})

_jwtResponse = api.model('jwtResponse', {
    'user': fields.Nested(_userModel),
    'jwt': fields.String(required=True, description="Jwt"),
    'message': fields.String(required=True, description="message")
})


# Parser section
def RegisterSection:
    pass


def UserParser():
    parser = reqparse.RequestParser()
    parser.add_argument('email', type=str, required=True)
    parser.add_argument('username', type=str, required=True)
    parser.add_argument('password', type=str, required=True)
    args = parser.parse_args()

    return args


@api.route("")
class FetchUsers(Resource):
    @api.doc('Fetch a list of users')
    @api.marshal_list_with(_usersResponse, envelope='data')
    def get(self):
        limit = request.args.get('limit') or ''
        sort_by = request.args.get('sort_by') or ''
        username_contains = request.args.get('username_contains') or ''

        users = user_service.get_users(limit, sort_by, username_contains)
        return ({
            "users": users,
            "message": "Fetched a list of users"
        }, 200)


@api.route('/<id>')
@api.param('id', 'User ID')
class User(Resource):
    @api.doc('Fetch a single user with the specified id')
    @api.marshal_with(_userResponse, envelope='data')
    def get(self, id):
        user = user_service.get_user(id)
        return ({
            "user": user,
            "message": "Fetched a user with an id of {}".format(id)
        }, 200)

    @api.doc('Delete a single user with the specified id')
    @api.marshal_with(_userResponse, envelope='data')
    def delete(self, id):
        user = user_service.delete_user(id)
        return ({
            "user"
        })

    @api.doc('Update a single user with the specified id')
    @api.marshal_with(_userResponse, envelope='data')
    def update(self, id):
        pass


@api.route('/register')
class Register(Resource):
    @api.doc('Create a new user')
    @api.marshal_with(_userResponse)
    def post(self):

        user = user_service.register(args)
        return ({
            "user": user,
            "message": "Created a new user with the id of {}".format(user.id)
        }, 201)


@api.route('/login')
class Login(Resource):
    @api.marshal_with(_jwtResponse)
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str, required=True)
        parser.add_argument('password', type=str, required=True)

        args = parser.parse_args()

        response = user_service.login(args)
        return response


@api.route('/logout')
class Logout(Resource):
    @api.marshal_with(_userResponse)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('Authorization', location='headers')
        args = parser.parse_args()
        print(args.Authorization)
        # if args.Authorization:
        #     response = service.logout(args.Authorization)
        #     return response
        # Token is not provided

        # if args.Authorization:

        # if auth_header:
        #     auth_token = auth_header.split(" ")[1]
        # else:
        #     auth_token = ""
        # print(auth_token, " test")
        # response = eservice.logout(auth_token)
        # return respons
