from flask_restx import Api
from flask import Blueprint

from .main.controller.user_controller import api as user_ns
from .main.controller.routine_controller import api as routine_ns
from .main.controller.exercise_controller import api as exercise_ns

blueprint = Blueprint('api', __name__)

api = Api(blueprint,
          title='stronk',
          version='1.0',
          description='workout app f0r chads'
          )

api.add_namespace(user_ns, path='/user')
api.add_namespace(routine_ns, path='/routine')
api.add_namespace(exercise_ns, path='/exercise')
