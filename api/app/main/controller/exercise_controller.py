from flask import request
from flask_restx import Resource, Namespace, fields, reqparse

# from app.main.utils.decorator import admin_token_required
from ..service.exercise_service import ExerciseService

api = Namespace('exercise', description="Exercise related operations")
_exercise = api.model('exercise', {
    'id': fields.String(required=True, description="User ID"),
    'name': fields.String(required=True, description="Name of the exercise"),
    'sets': fields.Integer(required=True, description="Number of sets"),
    'reps': fields.Integer(required=True, description="Number of reps")
})


service = ExerciseService()


@api.route('/')
class Exercises(Resource):
    @api.doc('Get list of exercises')
    @api.marshal_list_with(_exercise)
    def get(self):
        exercises = service.get_exercises()
        return exercises

    @api.doc('create a new exercise')
    @api.marshal_with(_exercise)
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str)
        parser.add_argument('sets', type=int)
        parser.add_argument('reps', type=int)
        args = parser.parse_args()
        response = service.create_exercise(args)
        return response


@api.route('/<id>')
@api.param('id', 'The exercise identifier')
@api.response(404, 'exercise not found.')
class Exercise(Resource):
    @api.doc('Get a exercise')
    @api.marshal_with(_exercise)
    def get(self, id):
        exercise = service.get_exercise(id)
        return exercise

    @api.doc('Update a exercise ')
    @api.marshal_with(_exercise)
    def put(self, id):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str)
        parser.add_argument('sets', type=int)
        parser.add_argument('reps', type=int)
        args = parser.parse_args()
        response = service.update_exercise(id, args)
        return response

    @api.doc('Delete a exercise')
    @api.marshal_with(_exercise)
    def delete(self, id):
        response = service.delete_exercise(id)
        return response
