from flask import request
from flask_restx import Resource, Namespace, fields

# from app.main.utils.decorator import admin_token_required
# from ..util.dto import UserDto
from ..service.user_service import UserService

api = Namespace('user', description="User related operations")
_user = api.model('user', {
    # 'id': fields.String(required=True, description="User ID"),
    'email': fields.String(required=True, description="Email Address"),
    'username': fields.String(required=True, description="Username"),
    'password': fields.String(description="Password")
})

service = UserService()


@api.route('/')
class Users(Resource):
    @api.doc('Get list of users')
    # @admin_token_required
    # @api.marshal_list_with(_user, envelope='data')
    def get(self):
        print('asd')
        users = service.get_users()
        return {
            "users": users
        }

    # @api.expect(_user, validate=True)
    # @admin_token_required
    @api.response(201, 'asdsadsad')
    @api.doc('Create a new user')
    def post(self):
        print('hi gua masuk')
        data = request.json
        user = service.create_user(data=data)
        return {
            "user": user
        }


@api.route('/<id>')
@api.param('id', 'The User identifier')
@api.response(404, 'User not found.')
class User(Resource):
    @api.doc('get a user')
    @api.marshal_list_with(_user)
    def get(self, id):
        user = service.get_user(id)
        if not user:
            api.abort(404)
        else:
            return user
