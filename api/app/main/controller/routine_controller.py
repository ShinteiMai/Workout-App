from flask import request
from flask_restx import Resource, Namespace, fields, reqparse

# from app.main.utils.decorator import admin_token_required
from ..service.routine_service import RoutineService

api = Namespace('routine', description="Routines related operations")
_routineModel = api.model('routine', {
    'id': fields.String(required=True, description="User ID"),
    'title': fields.String(required=True, description="title of the routine"),
    'description': fields.String(required=True, description="description of the routine"),
    'exercises': fields.String(description="list of the exercises")
})

_routinesResponse = api.model('routinesResponse', {
    'routines': fields.Nested(_routineModel),
    'message': fields.String(required=True, description="message")
})

_routineResponse = api.model('routineResponse', {
    'routine': fields.Nested(_routineModel),
    'message': fields.String(required=True, description="message")
})

routineService = RoutineService()


@api.route('/')
class Routines(Resource):
    @api.doc('Get list of routines')
    @api.marshal_list_with(_routineResponse, envelope='routines')
    def get(self):
        routines = routineService.get_routines()
        return {
            'routines': routines,
            'message': 'Fetched a list of routines'
        }

    @api.doc('create a new routine')
    @api.marshal_with(_routineResponse)
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('title', type=str)
        parser.add_argument('description', type=str)
        parser.add_argument('exercises', type=str)
        args = parser.parse_args()
        response = routineService.create_routine(args)
        return {
            'routine': routine,
            'message': 'Created a new routine'
        }


@api.route('/<id>')
@api.param('id', 'The Routine identifier')
@api.response(404, 'Routine not found.')
class Routine(Resource):
    @api.doc('get a routine')
    @api.marshal_with(_routineResponse)
    def get(self, id):
        routine = routineService.get_routine(id)
        return {
            'routine': routine,
            'message': 'Fetched a routine with an id of {}'.format(id)
        }

    @ api.doc('Update a routine ')
    @api.marshal_with(_routineResponse)
    def put(self, id):
        parser = reqparse.RequestParser()
        parser.add_argument('title', type=str)
        parser.add_argument('description', type=str)
        args = parser.parse_args()
        updatedRoutine = routineService.update_routine(id, args)
        return {
            'routine': updatedRoutine,
            'message': 'Updated a routine with an id of {}'.format(id)
        }

    @ api.doc('Delete a routine')
    @api.marshal_with(_routineResponse)
    def delete(self, id):
        response = routineService.delete_routine(id)
        return response
