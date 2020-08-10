import os
from dotenv import load_dotenv

from flask import Flask
from flask_restful import Api, Resource, reqparse

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DB_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PROPAGATE_EXCEPTIONS'] = True

api = Api(app)


class Routines(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('title',
                        type=str,
                        required=True,
                        help="Name can't be left blank")
    parser.add_argument('desc',
                        type=str,
                        required=True,
                        help="Description can't be left blank")
    # parser.add_argument('exerciseId',
    #                     type=str,
    #                     required=True,
    #                     help="Exercise ID can't be left blank")

    def get(self):
        pass

    def post(self):
        pass

    def put(self):
        pass

    def delete(self):
        pass


if __name__ == "__main__":
    from db import db
    db.init_app(app)
    app.run(debug=True, port=4000)
