from flask import request
from flask_restx import Resource, Namespace, fields, reqparse
from marshmallow import ValidationError

from ..model.exercise import ExerciseSchema
from ..service.exercise_service import ExerciseService
from ..utils.error import Error

exercise_service = ExerciseService()
exercise_schema = ExerciseSchema()

api = Namespace('exercise', description="Exercise related operations")

error = Error()


@api.route('')
class Exercises(Resource):
    @api.doc('Get a list of exercises')
    def get(self):
        limit = request.args.get('limit') or ''
        sort_by = request.args.get('sort_by') or ''
        title_contains = request.args.get('title_contains') or ''

        exercises = exercise_service.get_exercises(
            limit, sort_by, title_contains)
        data = exercise_schema.dump(exercises, many=True)["data"]
        return ({
            "data": data,
            "message": "Fetched a list of exercises"
        }, 200)

    def post(self):
        body = request.get_json(force=True)
        try:
            exercise_schema.load(body)

            exercise = exercise_service.create_exercise(
                body["data"]["attributes"])
            data = exercise_schema.dump(exercise)["data"]

            return ({
                "data": data,
                "message": "Created an exercise with the id of {}".format(exercise.id)
            })
        except ValidationError as err:
            error.validation_error(err.messages["error"])


@api.route('/<id>')
@api.param('id', 'The exercise identifier')
class Exercise(Resource):
    @api.doc('Get a single exercise with the specified id')
    def get(self, id):
        exercise = exercise_service.get_exercise(id)
        data = exercise_schema.dump(exercise)["data"]
        return ({
            "data": data,
            "message": "Fetched an exercise with the id of {}".format(id)
        }, 200)

    @api.doc('Update an exercise')
    def put(self, id):
        body = request.get_json(force=True)
        try:
            exercise_schema.load(body)

            exercise = exercise_service.update_exercise(
                id, body["data"]["attributes"])
            data = exercise_schema.dump(exercise)["data"]

            return ({
                "data": data,
                "message": "Updated an exercise with the id of {}".format(id)
            }, 201)
        except ValidationError as err:
            error.validation_error(err.messages["errors"])

    @api.doc('Delete an exercise')
    def delete(self, id):
        exercise = exercise_service.delete_exercise(id)
        data = exercise_schema.dump(exercise)["data"]
        return ({
            "data": data,
            "message": "Deleted an exercise"
        }, 200)
