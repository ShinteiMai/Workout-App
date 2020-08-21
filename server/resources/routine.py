from flask_restful import Resource, reqparse
from models.routine import RoutineModel


class Routines(Resource):
    def get(self):
        return ({
            'routines': list(map(lambda x: x.json(), RoutineModel.find()))
        })


class Routine(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id',
                            type=str,
                            required=True,
                            help="You must specify the routine id"
                            )
        data = parser.parse_args()

        try:
            routine = RoutineModel.find_by_id(data.id)
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
        parser.add_argument('title',
                            type=str,
                            required=True,
                            help="You must specify the title of the routine"
                            )
        parser.add_argument('description',
                            type=str,
                            required=True,
                            help="You must specify the title of the routine"
                            )
        data = parser.parse_args()

        routine = RoutineModel(**data)
        try:
            routine.save()
        except:
            return ({
                "message": "An error occurred during creating the routine"
            }, 500)

        return routine.json(), 201

    def put(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id',
                            type=str,
                            required=True,
                            help="You must specify the id of the routine"
                            )
        parser.add_argument('title',
                            type=str,
                            )
        parser.add_argument('description',
                            type=str,
                            )

        data = parser.parse_args()
        routine = RoutineModel.find_by_id(data.id)

        if routine is not None:
            if data.title:
                routine.title = data.title
            if data.description:
                routine.description = data.description

            try:
                routine.save()
            except:
                return ({
                    "message": "An error was occurred during updating the routine"
                }, 500)

            return routine.json(), 201
        return ({
            "message": "Routine with the id of {} was not found".format(data.id)
        }, 404)

    def delete(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id',
                            type=str,
                            required=True,
                            help="You must specify the id of the routine"
                            )

        data = parser.parse_args()
        routine = RoutineModel.find_by_id(data.id)

        if routine is not None:
            try:
                routine.delete()
            except:
                return ({
                    "message": "An error occurred during deleting the routine"
                }, 500)

            return routine.json(), 200

        return ({
            "message": "Routine with the id of {} was not found".format(data.id)
        }, 404)


class PushExercise(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('routine_id',
                            type=str,
                            required=True,
                            help="You have to specify the routine_id"
                            )
        parser.add_argument('exercise_id',
                            type=str,
                            required=True,
                            help="You have to specify the exercise_id"
                            )

        data = parser.parse_args()
        print(data)


class PopExercise(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('routine_id',
                            type=str,
                            required=True,
                            help="You have to specify the routine_id"
                            )
        parser.add_argument('exercise_id',
                            type=str,
                            required=True,
                            help="You have to specify the exercise_id"
                            )
        data = parser.parse_args()
