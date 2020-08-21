from flask_restful import Resource, reqparse
from models.exercise import ExerciseModel


class Exercises(Resource):
    def get(self):
        return ({
            'exercises': list(map(lambda x: x.json(), ExerciseModel.find()))
        })


class Exercise(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id',
                            type=str,
                            required=True,
                            help="You must provide an exercise id"
                            )

        data = parser.parse_args()

        try:
            exercise = ExerciseModel.find_by_id(data.id)
        except:
            return ({
                "message": "An error occurred during fetching the exercise"
            }, 500)

        if exercise:
            return exercise.json(), 200

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

        return exercise.json(), 201

    def put(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id',
                            type=str,
                            help="You must specify the id of the exercise that you want to update"
                            )
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
        exercise = ExerciseModel.find_by_id(data.id)
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

            return exercise.json(), 201
        return ({
            "message": "Exercise with the id of {} was not found".format(data.id)
        }, 404)

    def delete(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id',
                            type=str,
                            required=True,
                            help="You must specify an id"
                            )

        data = parser.parse_args()
        exercise = ExerciseModel.find_by_id(data.id)

        if exercise is not None:
            try:
                exercise.delete()
            except:
                return ({
                    "message": "An error occurred during deleting the exercise"
                }, 500)

            return exercise.json(), 200

        return ({
            "message": "Exercise with the id of {} was not found".format(data.id)
        }, 404)
