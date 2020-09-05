.ONESHELL:

.PHONY: clean install run all freeze migrate
DATABASE_URL := postgres://postgres:@localhost:5432/stronk
test:
	echo $(DATABASE_URL); \

freeze:
	pip freeze > requirements.txt

migrate: test
	. venv/bin/activate; \
	python3 manage.py db init;
	# python3 manage.py db makemigrations;
	python3 manage.py db migrate --message "database migrated"; \
	python3 manage.py db upgrade;

clean:
	find . -type f -name '*.pyc' -delete
	find . -type f -name '*.log' -delete

install:
	pip install virtualenv
	. venv/bin/activate; \
	pip install -r requirements.txt;

run:
	. venv/bin/activate; \
	python manage.py run;

production:
	. venv/bin/activate; \
	uwsgi -s /tmp/wsgi.sock --ini wsgi.ini 

all: clean install runr


