import uuid
import datetime

from sqlalchemy.exc import SQLAlchemyError

from app.main.model.routine import Routine, RoutineSchema
from app.main.model.exercise import Exercise
from app.main.model.day import Day

from app.main.utils.response import Response
from app.main import db, DEFAULT_LIMIT
from app.main.utils.error import RoutineError, ExerciseError

Error = RoutineError()
exercise_error = ExerciseError()


class RoutineService(Response):
    @staticmethod
    def get_routines(limit, sort_by, title_contains):
        try:
            search = "%{}%".format(title_contains)
            query = Routine.query.filter(Routine.title.like(
                search)) if title_contains else Routine.query

            routines = query.order_by(Routine.title).limit(
                int(limit) if limit else DEFAULT_LIMIT).all()

            return routines
        except SQLAlchemyError as err:
            Error.server_error()

    @staticmethod
    def get_routine(id):
        try:
            routine = Routine.query.filter(Routine.id == id).first()
            if not routine:
                Error.routine_not_found(id)
            return routine
        except SQLAlchemyError as err:
            Error.server_error()

    @staticmethod
    def create_routine(data):
        new_routine = Routine(**data)
        try:
            new_routine.add()
        except SQLAlchemyError as err:
            Error.server_error()

        return new_routine

    @staticmethod
    def update_routine(id, data):
        query = Routine.query.filter(Routine.id == id)
        try:
            query.update(data)
            db.session.commit()

            routine = query.first()
            return routine
        except SQLAlchemyError as err:
            Error.server_error()

    @staticmethod
    def delete_routine(id):
        try:
            routine = Routine.query.filter(Routine.id == id).first()
            if not routine:
                Error.routine_not_found(id)
            routine.delete()
        except SQLAlchemyError as err:
            Error.server_error()
        return routine

    @staticmethod
    def add_exercise_to_routine(routine_id, exercise_id):
        try:
            routine = Routine.query.filter(Routine.id == routine_id).first()
            if not routine:
                Error.routine_not_found(exercise_id)

            # Check if the exercise from exercise_id already exists in the current routine
            if len(list(
                    filter(
                        lambda exercise: str(exercise.id) == exercise_id,
                        routine.exercises
                    )
            )) is not 0:
                Error.exercise_already_exists(routine_id, exercise_id)

            exercise = Exercise.query.filter(
                Exercise.id == exercise_id).first()
            if not exercise:
                Error.exercise_not_found(exercise_id)

            routine.exercises.append(exercise)
            routine.add()

            return routine
        except SQLAlchemyError as err:
            Error.server_error()

    @staticmethod
    def remove_exercise_from_routine(routine_id, exercise_id):
        try:
            routine = Routine.query.filter(Routine.id == routine_id).first()
            if not routine:
                Error.routine_not_found(exercise_id)
            exercise = Exercise.query.filter(
                Exercise.id == exercise_id).first()
            if not exercise:
                exercise_error.exercise_not_found(exercise_id)
            routine.exercises.remove(exercise)
            routine.add()

            return routine
        except SQLAlchemyError as err:
            Error.server_error()

    @staticmethod
    def add_days_to_routine():
        # we can work on this later tbh
        pass
