.ONESHELL:

.PHONY: clean install run all freeze migrate stop
freeze:
	pip freeze > requirements.txt

initial-migrate:
	. venv/bin/activate; \
	python3 manage.py db init; \
	python3 manage.py db migrate --message "database migrated"; \
	python3 manage.py db upgrade;

migrate:
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
	python3 manage.py db init; \
	python3 manage.py db migrate --message "database migrated"; \
	python3 manage.py db upgrade; \
	uwsgi wsgi.ini 

stop: 
	docker stop $(docker ps -a -q);

all: clean install run


