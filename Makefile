.ONESHELL:

.PHONY: clean install run all freeze migrate

install:
	pip install virtualenv
	. venv/bin/activate; \
	pip install -r requirements.txt;

localtunnel:
	cd ./tools; \
	python3 localtunnel.py; \

production:
	. venv/bin/activate; \
	python3 manage.py db init; \
	python3 manage.py db migrate --message "database migrated"; \
	python3 manage.py db upgrade; \
	uwsgi wsgi.ini 

all: clean install run