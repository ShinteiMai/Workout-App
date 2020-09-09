import uuid
import datetime

from app.main.utils.response import Response
from app.main import db
from app.main.model.exercise import ExerciseModel

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)


class ExerciseService(Response):

    def get_exercises(self):
        exercises = list(map(lambda x: x.json(), ExerciseModel.query.all()))
        return exercises

    def get_exercise(self, id):
        try:
            exercise = ExerciseModel.query.filter_by(id=id).first()
        except:
            return None
        return exercise

    def create_exercise(self, data):
        exercise = ExerciseModel(**data)
        try:
            exercise.save()
        except:
            return None

        return exercise

    def update_exercise(self, id, data):
        try:
            exercise = self.get_exercise(id)
            exercise.name = data['name']
            exercise.reps = data['reps']
            exercise.sets = data['sets']
            db.session.commit()
            # exercise.update_and_save(ExerciseModel, id, data)
        except:
            return None

        return exercise

    def delete_exercise(self, id):
        exercise = self.get_exercise(id)

        if exercise == None:
            return None
        else:
            try:
                exercise.delete()
            except:
                return None

        return exercise
