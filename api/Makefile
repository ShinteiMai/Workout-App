.ONESHELL:

.PHONY: clean install run all freeze migrate
DATABASE_URL := postgres://postgres:admin@localhost:5432/stronk
test:
	python3 environ.py; \
	echo $(DATABASE_URL); \

freeze:
	pip freeze > requirements.txt

migrate:
	. venv/bin/activate; \
	python3 environ.py; \
	python3 manage.py db init; \
	python3 manage.py db migrate --message "database migrated"; \
	python3 manage.py db upgrade;

clean:
	find . -type f -name '*.pyc' -delete
	find . -type f -name '*.log' -delete

install:
	pip install virtualenv
	. venv/bin/activate; \
	python3 environ.py; \
	pip install -r requirements.txt;

run:
	. venv/bin/activate; \
	python3 environ.py; \
	python manage.py run;

production:
	. venv/bin/activate; \
	python3 environ.py; \
	uwsgi -s /tmp/wsgi.sock --ini wsgi.ini

all: clean install run