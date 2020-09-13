from functools import wraps
from flask import request
from ..service.user_service import UserService


def auth_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        # 1. Check if token is valid and user really exists
        user = UserService.check_auth(request)
        # 2. Throw error if not authenticated
        # Not authenticated error
        # 3. Return idk what is this
        return f(*args, **kwargs)
    # 4. Return decorated function
    return decorated
