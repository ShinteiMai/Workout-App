import os
from dotenv import load_dotenv

from flask import Flask
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from resources.exercise import Exercise, Exercises
from resources.routine import Routine, Routines, PushExercise, PopExercise
from resources.user import Register, Login, Logout, Users, User, Me, Ping

load_dotenv()
PORT = os.getenv('PORT')
SECRET_KEY = os.getenv('SECRET_KEY')
DATABASE_URI = os.getenv('DATABASE_URI')

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = SECRET_KEY
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['PROPAGATE_EXCEPTIONS'] = True

api = Api(app)
jwt = JWTManager(app)


@app.before_first_request
def create_tables():
    db.create_all()


class Home(Resource):
    def get(self):
        return ({
            "message": "wtf boi"
        })


api.add_resource(PushExercise, '/routine/push-exercise')
api.add_resource(PopExercise, '/routine/pop-exercise')

api.add_resource(Routines, '/routines')
api.add_resource(Routine, '/routine')

api.add_resource(Exercises, '/exercises')
api.add_resource(Exercise, '/exercise')

api.add_resource(Users, '/users')
api.add_resource(User, '/user')

api.add_resource(Register, '/register/')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(Me, '/me')

api.add_resource(Ping, '/ping')

api.add_resource(Home, "/")

if __name__ == "__main__":
    from db import db
    db.init_app(app)
    app.run(debug=True, port=PORT)
