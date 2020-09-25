from flask import request, redirect, url_for
from flask_restx import Resource, Namespace, fields, reqparse
from marshmallow import ValidationError

from ..model.user import UserSchema, AuthSchema
from ..service.user_service import UserService
from ..utils.error import AuthError
from ..utils.decorator import auth_required

from .. import oauth
import os


user_service = UserService()
user_schema = UserSchema()
error = AuthError()

google = oauth.register(
    name='google',
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    access_token_url='https://accounts.google.com/o/oauth2/token',
    access_token_params=None,
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    api_base_url='https://www.googleapis.com/oauth2/v1/',
    userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',
    client_kwargs={'scope': 'openid email profile'},
)

api = Namespace('user', description="User related operations")


@api.route('/google/authorize')
class Google_Auth(Resource):
    @api.doc("Auth with google OAuth")
    def post(self):
        body = request.get_json(force=True)
        try:
            # AuthSchema().load(body)

            auth = user_service.google_auth(body["data"]["attributes"])
            print(auth)
            data = user_schema.dump(auth["user"])["data"]
            data["attributes"]["jwt"] = auth["jwt"]
            return ({
                "data": data,
                "message": "Successfully login as an user with the id of '{}'".format(auth["user"].id)
            }, 200)
        except ValidationError as err:
            error.validation_error(err.messages)


# @ api.route('/google/authorize')
# class Google_Authorize(Resource):
#     def get(self):
#         # 0. Create the google oauth client
#         google=oauth.create_client('google')
#         # 1. Access token from google (needed to get user info)
#         token=google.authorize_access_token()
#         # 2. userinfo contains stuff u specificed in the scrope
#         resp=google.get('userinfo')
#         user_info=resp.json()
#         user=oauth.google.userinfo()  # uses openid endpoint to fetch user info
#         # Here you use the profile/user data that you got and query your database find/register the user
#         # and set ur own data in the session not the profile from google
#         print(user)
#         return redirect('/')


@ api.route('/register')
class Register(Resource):
    @ api.doc('Create a new user')
    def post(self):
        body = request.get_json(force=True)
        print(body)
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


@ api.route('/login')
class Login(Resource):
    @ api.doc("Login as a user")
    def post(self):
        body = request.get_json(force=True)
        try:
            AuthSchema().load(body)

            auth = user_service.login(body["data"]["attributes"])
            data = user_schema.dump(auth["user"])["data"]
            data["attributes"]["jwt"] = auth["jwt"]
            return ({
                "data": data,
                "message": "Successfully login as an user with the id of '{}'".format(auth["user"].id)
            }, 200)
        except ValidationError as err:
            error.validation_error(err.messages)


@ api.route('/logout')
class Logout(Resource):
    @ api.doc("Logout as a user")
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


@ api.route("")
class Users(Resource):
    @ api.doc('Fetch a list of users')
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


@ api.route('/<id>')
@ api.param('id', 'User ID')
class User(Resource):
    @ api.doc('Fetch a single user with the specified id')
    def get(self, id):
        user = user_service.get_user(id)
        data = user_schema.dump(user)["data"]
        print(data)
        return ({
            "data": data,
            "message": "Fetched an user with the id of '{}'".format(id)
        }, 200)

    @ api.doc('Delete a single user with the specified id')
    def delete(self, id):
        user = user_service.delete_user(id)
        data = user_schema.dump(user)["data"]
        return ({
            "data": data,
            "message": "Deleted an user with the id of '{}'".format(id)
        }, 200)

    @ api.doc('Update a single user with the specified id')
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
