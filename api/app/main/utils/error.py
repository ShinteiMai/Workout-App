from flask_restx import abort


class Error():
    @staticmethod
    def server_error():
        abort(500, "Server error :(")

    @staticmethod
    def validation_error(messages):
        abort(403, messages)


class AuthError(Error):
    @staticmethod
    def user_already_exists():
        abort(409, "User with the specified email already exists")

    @staticmethod
    def user_not_found(id):
        abort(404, "User with the specified id of {} is not found".format(id))

    @staticmethod
    def token_not_provided():
        abort(401, "Authentication token is not provided")

    @staticmethod
    def auth_is_invalid():
        abort(409, "Authentication failed, please check your email/password")

    @staticmethod
    def token_is_blacklisted():
        abort(409, "Authentication failed, please log in again")


class RoutineError(Error):
    @staticmethod
    def routine_not_found():
        abort(404, "Routine with the specified id is not found")


class ExerciseError(Error):
    @staticmethod
    def exercise_not_found():
        abort(404, "Exercise with the specified id is not found")
