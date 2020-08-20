from flask_restful import Resource, reqparse
from models.routine import RoutineModel


class Routines(Resource):
    def get(self):
        return ({
            'routines': list(map(lambda x: x.json(), RoutineModel.find()))
        })


class Routine(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('id',
                        type=str,
                        required=True,
                        help="You must provide a routine id"
                        )

    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id')

        try:
            routine = RoutineModel.find_by_id(id)
        except:
            return ({
                "message": "There was an error during fetching the routine"
            }, 500)

        if routine:
            return routine.json(), 200

        return ({
            "message": "Routine was not found"
        }, 404)

    def post(self):
        parser = reqparse.RequestParser()
