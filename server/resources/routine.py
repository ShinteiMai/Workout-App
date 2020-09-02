from flask_restful import Resource, reqparse, request
from models.routine import RoutineModel
from models.exercise import ExerciseModel


class Routines(Resource):
    def get(self):
        return ({
            'routines': list(map(lambda x: x.json(), RoutineModel.find()))
        })


class Routine(Resource):
    def get(self):
        id = request.args["id"]
        try:
            routine = RoutineModel.find_by_id(id)
        except:
            return ({
                "message": "There was an error during fetching the routine"
            }, 500)

        if routine:
            return ({
                "routine": routine.json()
            }, 200)

        return ({
            "message": "Routine with the id of {} was not found".format(id)
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

        return ({"routine": routine.json()}, 201)

    def put(self):
        id = request.args["id"]
        parser = reqparse.RequestParser()
        parser.add_argument('title',
                            type=str,
                            )
        parser.add_argument('description',
                            type=str,
                            )

        data = parser.parse_args()
        routine = RoutineModel.find_by_id(id)

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

            return ({"routine": routine.json()}, 201)
        return ({
            "message": "Routine with the id of {} was not found".format(id)
        }, 404)

    def delete(self):
        id = request.args["id"]
        routine = RoutineModel.find_by_id(id)

        if routine is not None:
            try:
                routine.delete()
            except:
                return ({
                    "message": "An error occurred during deleting the routine"
                }, 500)

            return ({"routine": routine.json()}, 200)

        return ({
            "message": "Routine with the id of {} was not found".format(id)
        }, 404)


class PushExercise(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('routineId',
                            type=str,
                            required=True,
                            help="You have to specify the routine_id"
                            )
        parser.add_argument('exerciseId',
                            type=str,
                            required=True,
                            help="You have to specify the exercise_id"
                            )

        data = parser.parse_args()

        try:
            routine = RoutineModel.find_by_id(data.routineId)
            if routine is None:
                return ({
                    "message": "Routine with the id of {} could not be found".format(data.routineId)
                }, 404)

            exercise = ExerciseModel.find_by_id(data.exerciseId)
            if exercise is None:
                return ({
                    "message": "Exercise with the id of {} could not be found".format(data.exerciseId)
                }, 404)
        except:
            return ({
                "message": "An error occurred during verifying the routine and exercise"
            }, 500)

        routine.exercises.append(exercise)
        try:
            routine.save()
        except:
            return ({
                "message": "An error occurred during appending an exercise to a routine"
            }, 500)

        return routine.json(), 201


class PopExercise(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('routineId',
                            type=str,
                            required=True,
                            help="You have to specify the routineId"
                            )
        parser.add_argument('exerciseId',
                            type=str,
                            required=True,
                            help="You have to specify the exerciseId"
                            )
        data = parser.parse_args()

        try:
            routine = RoutineModel.find_by_id(data.routineId)
            if routine is None:
                return ({
                    "message": "Routine with the id of {} could not be found".format(data.routineId)
                }, 404)
            exercise = ExerciseModel.find_by_id(data.exerciseId)
            if exercise is None:
                return ({
                    "message": "Exercise with the id of {} could not be found".format(data.exerciseId)
                }, 400)
        except:
            return ({
                "message": "An error occurred during finding between the routine and the exercise"
            }, 500)
        routine.exercises.remove(exercise)

        try:
            routine.save()
        except:
            return ({
                "message": "An error occurred during popping the exercise {} from routine {}".format(exerciseId, routineId)
            }, 500)

        return routine.json(), 200
