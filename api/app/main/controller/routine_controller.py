from flask import request
from flask_restx import Resource, Namespace, fields, reqparse
from marshmallow import ValidationError

from ..model.routine import RoutineSchema
from ..service.routine_service import RoutineService
from app.main.utils.error import RoutineError


routine_service = RoutineService()
routine_schema = RoutineSchema()
error = RoutineError()

api = Namespace('routine', description="Routines related operations")


@api.route('/')
class Routines(Resource):
    @api.doc('Get list of routines')
    def get(self):
        limit = request.args.get('limit') or ''
        sort_by = request.args.get('sort_by') or ''
        routine_contains = request.args.get('routine_contains') or ''

        routines = routine_service.get_routines(
            limit, sort_by, routine_contains)
        data = routine_schema.dump(routines, many=True)["data"]
        return ({
            'routines': routines,
            'message': 'Fetched a list of routines'
        }, 200)

    @api.doc('Create a new routine')
    def post(self):
        body = request.get_json(force=True)
        try:
            routine_schema.load(body)

            new_routine = routine_service.create_routine(
                body["data"]["attributes"])
            data = routine_service.dump(new_routine)["data"]
            return ({
                "data": data,
                "message": "Created a new routine with the id of '{}'".format(new_routine.id)
            }, 201)
        except ValidationError as err:
            error.validation_error(err.messages["errors"])


@api.route('/<id>')
@api.param('id', 'Routine ID')
class Routine(Resource):
    @api.doc('Fetach a single rooutine with the specified id')
    def get(self, id):
        routine = routine_service.get_routine(id)
        data = routine_schema.dump(routine)['data']
        return ({
            'routine': routine,
            'message': 'Fetched a routine with an id of {}'.format(id)
        }, 200)

    @api.doc('Update a routine ')
    def put(self, id):
        body = request.get_json(force=True)
        try:
            routine_schema.load(body)

            routine = routine_service.update_routine(
                id, body["data"]["attributes"])
            data = routine_schema.dump(routine)["data"]
            return ({
                "data": data,
                "message": "Updated an routine with the id of '{}'".format(id)
            })
        except ValidationError as err:
            error.validation_error(err.messages["errors"])

    @api.doc('Delete a routine with the specified id')
    def delete(self, id):
        routine = routine_service.delete_routine(id)
        data = routine_schema.dump(routine)['data']
        return ({
            "data": data,
            "message": "Deleted an routine with the id of '{}'".format(id)
        }, 200)
