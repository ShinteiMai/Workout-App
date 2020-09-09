# from .response import Response
from flask_restx import abort
# response = Response()


class Error():
    def server_error(self):
        abort(500, "Server error :(")


class AuthError(Error):
    def auth_is_invalid(self):
        abort(409, "Authentication failed, please check your email/password")

    def user_already_exists(self):
        abort(409, "User with the specified email already exists")

    def user_not_found(self):
        abort(404, "User with the specified id is not found")


class RoutineError(Error):
    def routine_not_found(self):
        abort(404, "Routine with the specified id is not found")


class ExerciseError(Error):
    def exercise_not_found(self):
        abort(404, "Exercise with the specified id is not found")

# @api.errorhandler(NoResultFound)
# def handle_no_result_exception(error):
#     return {'message': 'resource not found'}, 404
