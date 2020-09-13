import os
from dotenv import load_dotenv

from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from flask_cors import CORS

from app import blueprint
from app.main import create_app, db

load_dotenv()

ENVIRONMENT = os.getenv("ENVIRONMENT")
app = create_app(ENVIRONMENT or 'dev')
CORS(app)

app.register_blueprint(blueprint)
app.app_context().push()

manager = Manager(app)
migrate = Migrate(app, db)
manager.add_command('db', MigrateCommand)


@manager.command
def run():
    app.run(port=8080)


if __name__ == '__main__':
    manager.run()
