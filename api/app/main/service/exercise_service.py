import uuid
import datetime
from sqlalchemy.exc import SQLAlchemyError
from marshmallow import ValidationError

from app.main import db, DEFAULT_LIMIT
from app.main.model.exercise import Exercise, ExerciseSchema
from app.main.utils.error import ExerciseError

Error = ExerciseError()


class ExerciseService():
    @staticmethod
    def get_exercises(limit, sort_by, title_contains):
        try:
            search_query = "%{}%".format(title_contains)
            query = Exercise.query.filter(Exercise.title.like(
                search_query)) if title_contains else Exercise.query
            # same problem idk how to sort_by conditionally
            exercises = query.order_by(Exercise.title).limit(
                int(limit) if limit else DEFAULT_LIMIT).all()
            return exercises
        except SQLAlchemyError as err:
            Error.server_error()

    @staticmethod
    def get_exercise(id):
        try:
            exercise = Exercise.query.filter(Exercise.id == id).first()
            if not exercise:
                Error.exercise_not_found(id)
            return exercise
        except SQLAlchemyError as err:
            Error.server_error()

    @staticmethod
    def create_exercise(data):
        new_exercise = Exercise(**data)
        try:
            new_exercise.add()
        except SQLAlchemyError as err:
            Error.server_error()

        return new_exercise

    @staticmethod
    def update_exercise(id, data):
        query = Exercise.query.filter(Exercise.id == id)
        try:
            query.update(data)
            db.session.commit()

            exercise = query.first()
            return exercise
        except SQLAlchemyError as err:
            Error.server_error()
        return exercise

    @staticmethod
    def delete_exercise(id):
        try:
            exercise = Exercise.query.filter(Exercise.id == id).first()
            if not exercise:
                Error.exercise_not_found(id)
            exercise.delete()
        except SQLAlchemyError as err:
            Error.server_error()
        return exercise
