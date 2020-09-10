from flask import request
from flask_restx import Resource, Namespace, fields, reqparse

# from app.main.utils.decorator import admin_token_required
from ..service.user_service import UserService
from ..utils.decorator import auth_required
from flask_jwt_extended import jwt_required

api = Namespace('user', description="User related operations")
_user = api.model('user', {
    'id': fields.String(required=True, description="User ID"),
    'email': fields.String(required=True, description="Email Address"),
    'username': fields.String(required=True, description="Username"),
    'registered_on': fields.String(required=True, description="Registered at"),
    'is_verified': fields.Boolean(required=True, description="User Verificiation Stats")
})

_jwt = api.model('jwt', {
    'user': fields.Nested(_user),
    'jwt': fields.String(required=True, description="Jwt"),
    # 'refresh_jwt': fields.String(required=True, description='Refresh_Jwt')
})

service = UserService()


@api.route('/')
class fetchUsers(Resource):
    @api.doc('Get list of users')
    @api.marshal_list_with(_user, envelope='data')
    def get(self):
        print('asd')
        users = service.get_users()
        return users


@api.route('/<id>')
@api.param('id', 'The User identifier')
@api.response(404, 'User not found.')
class fetchUser(Resource):
    @jwt_required
    @api.doc('get a user')
    @api.marshal_with(_user)
    def get(self, id):
        user = service.get_user(id)
        if not user:
            api.abort(404)
        else:
            return (user, 200)


@api.route('/register')
class Register(Resource):
    @api.doc('Create a new user')
    @api.response(201, '')
    @api.marshal_with(_user)
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str)
        parser.add_argument('username', type=str)
        parser.add_argument('password', type=str)

        args = parser.parse_args()
        response = service.register(args)
        return response


@api.route('/login')
@api.response(200, 'User logged in')
class Login(Resource):
    @api.marshal_with(_jwt)
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str)
        parser.add_argument('password', type=str)

        args = parser.parse_args()
        # print(args)
        response = service.login(args)
        return response


@api.route('/logout')
@api.response(200, 'User logged out')
class Logout(Resource):
    @api.marshal_with(_user)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('Authorization', location='headers')
        args = parser.parse_args()
        print(args.Authorization)
        if args.Authorization:
            response = service.logout(args.Authorization)
            return response
        # Token is not provided

        # if args.Authorization:

        # if auth_header:
        #     auth_token = auth_header.split(" ")[1]
        # else:
        #     auth_token = ""
        # print(auth_token, " test")
        # response = eservice.logout(auth_token)
        # return respons
