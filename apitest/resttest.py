# -*- coding: utf-8 -*-
"""
Created on Wed Aug 19 14:26:50 2020

@author: aldon
"""

from flask import Flask, request
from flask_restful import Api, Resource, reqparse, abort

app = Flask(__name__)
api = Api(app)

workout_put_args = reqparse.RequestParser()
workout_put_args.add_argument("name", type=str, help="Name of the workout", required=True)
workout_put_args.add_argument("age", type=int, help="Name of the workout", required=True)
workout_put_args.add_argument("cultivation", type=str, help=" of the workout", required=True)


workoutList = {
        }


def abortWorkout(woname):
    if woname not in workoutList:
        abort(404, message= "Workout is not valid")
        
def abortWorkoutDuplicate(woname):
    if woname in workoutList:
        abort(409, message= 'Workout already exists')

class  workout(Resource):
    def get(self, woname):
        abortWorkout(woname)
        return workoutList[woname]
    
    def put(self, woname):
        abortWorkoutDuplicate(woname)
        args = workout_put_args.parse_args()
        workoutList[woname]=args
        return workoutList[woname], 201
    
    def delete(self, woname):
        #abortWorkout(woname)
        del workoutList[woname]
        return '', 204
        

    
api.add_resource(workout, "/helloword/<string:woname>")

if __name__ == '__main__':
    app.run(debug=True)
