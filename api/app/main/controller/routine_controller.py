from flask import request
from flask_restx import Resource, Namespace, fields, reqparse

# from app.main.utils.decorator import admin_token_required
from ..service.routine_service import RoutineService

api = Namespace('routine', description="Routines related operations")
_routine = api.model('routine', {
    'id': fields.String(required=True, description="User ID"),
    'title': fields.String(required=True, description="title of the routine"),
    'description': fields.String(required=True, description="description of the routine"),
    'exercises': fields.String(description="list of the exercises")
})

service = RoutineService()


@api.route('/')
class Routines(Resource):
    @api.doc('Get list of routines')
    @api.marshal_list_with(_routine, envelope='routines')
    def get(self):
        routines = service.get_routines()
        return routines

    @api.doc('create a new routine')
    @api.marshal_with(_routine)
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('title', type=str)
        parser.add_argument('description', type=str)
        parser.add_argument('exercises', type=str)
        args = parser.parse_args()
        response = service.create_routine(args)
        return response


@api.route('/<id>')
@api.param('id', 'The Routine identifier')
@api.response(404, 'Routineot found.')
class Routine(Resource):
    @api.doc('get a user')
    @api.marshal_with(_routine)
    def get(self, id):
        routine = service.get_routine(id)
        return routine

    @ api.doc('Update a routine ')
    @api.marshal_with(_routine)
    def put(self, id):
        parser = reqparse.RequestParser()
        parser.add_argument('title', type=str)
        parser.add_argument('description', type=str)
        args = parser.parse_args()
        response = service.update_routine(id, args)
        return response

    @ api.doc('Delete a routine')
    @api.marshal_with(_routine)
    def delete(self, id):
        response = service.delete_routine(id)
        return response
