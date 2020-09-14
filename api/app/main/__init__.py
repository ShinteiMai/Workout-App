from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from authlib.integrations.flask_client import OAuth


from .config import config_by_name

jwt = JWTManager()
db = SQLAlchemy()
flask_bcrypt = Bcrypt()
oauth = OAuth()

# constants
DEFAULT_LIMIT = 25


def create_app(config_name):
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(config_by_name[config_name])
    db.init_app(app)
    flask_bcrypt.init_app(app)
    oauth.init_app(app)
    jwt.init_app(app)

    return app
