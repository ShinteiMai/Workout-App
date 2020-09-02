from flask_restful import Resource, reqparse, request
from models.exercise import ExerciseModel


class Exercises(Resource):
    def get(self):
        return ({
            'exercises': list(map(lambda x: x.json(), ExerciseModel.find()))
        })


class Exercise(Resource):
    def get(self):
        id = request.args["id"]
        try:
            exercise = ExerciseModel.find_by_id(id)
        except:
            return ({
                "message": "An error occurred during fetching the exercise"
            }, 500)

        if exercise:
            return ({"exercise": exercise.json()}, 200)

        return ({
            "message": "Exercise was not found"
        }, 404)

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name',
                            type=str,
                            required=True,
                            help="You must specify the name of the exercise"
                            )
        parser.add_argument('sets',
                            type=int,
                            required=True,
                            help="You must specify the number of sets in the exercise"
                            )
        parser.add_argument('reps',
                            type=int,
                            required=True,
                            help="You must specify the number of reps in the exercise"
                            )

        data = parser.parse_args()

        exercise = ExerciseModel(**data)
        try:
            exercise.save()
        except:
            return ({
                "message": "An error occurred during creating the exercise"
            }, 500)

        return ({"exercise": exercise.json()}), 201

    def put(self):
        id = request.args["id"]
        parser = reqparse.RequestParser()
        parser.add_argument('name',
                            type=str,
                            )
        parser.add_argument('sets',
                            type=int,
                            )
        parser.add_argument('reps',
                            type=int,
                            )

        data = parser.parse_args()
        exercise = ExerciseModel.find_by_id(id)
        if exercise is not None:
            if data.name:
                exercise.name = data.name
            if data.sets:
                exercise.sets = data.sets
            if data.reps:
                exercise.reps = data.reps

            try:
                exercise.save()
            except:
                return ({
                    "message": "An error was occurred during updating the exercise"
                }, 500)

            return ({"exercise": exercise.json()}, 201)
        return ({
            "message": "Exercise with the id of {} was not found".format(data.id)
        }, 404)

    def delete(self):
        id = request.args["id"]
        exercise = ExerciseModel.find_by_id(id)

        if exercise is not None:
            try:
                exercise.delete()
            except:
                return ({
                    "message": "An error occurred during deleting the exercise"
                }, 500)

            return ({"exercise": exercise.json()}, 200)

        return ({
            "message": "Exercise with the id of {} was not found".format(data.id)
        }, 404)
