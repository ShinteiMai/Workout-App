import uuid
import datetime

from sqlalchemy.exc import SQLAlchemyError

from app.main.utils.response import Response
from app.main import db, DEFAULT_LIMIT
from app.main.model.routine import Routine, RoutineSchema
from app.main.model.day import Day
from app.main.utils.error import RoutineError

Error = RoutineError()


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
    def create_routine(self):
        new_routine = Routine(**data)
        try:
            new_routine.save()
        except SQLAlchemyError as err:
            Error.server_error()

        return new_routine

    @staticmethod
    def update_routine(id):
        try:
            routine = Routine.query.filter(Routine.id == id).first()
            if routine:

                routine.commit()
                return routine
            else:
                Error.routine_not_found(id)
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
