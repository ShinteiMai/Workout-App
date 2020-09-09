import uuid
import datetime

from app.main.utils.response import Response
from app.main import db
from app.main.model.routine import RoutineModel

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)


class RoutineService(Response):

    def get_routines(self):
        routines = list(map(lambda x: x.json(), RoutineModel.query.all()))
        return routines

    def get_routine(self, id):
        try:
            routine = RoutineModel.query.filter_by(id=id).first()
        except:
            return None
        return routine

    def create_routine(self, data):
        routine = RoutineModel(**data)
        try:
            routine.save()
        except:
            return None

        return routine

    def update_routine(self, id, data):
        try:
            routine = self.get_routine(id)
            routine.title = data['title']
            routine.description = data['description']
            # routine.exercises = data['exercises']
            db.session.commit()
        except:
            return None

        return routine

    def delete_routine(self, id):
        routine = self.get_routine(id)

        if routine == None:
            return {'message': 'Not Found'}
        else:
            try:
                routine.delete()
            except:
                return None

        return {'message': 'Operation Succeeded'}
