FROM python:3.8.5

# 0. Set the working directory to .
# 1. Copy the current directory . into the container at /app
RUN mkdir /app
ADD . /app/
WORKDIR /app

# 2. Install all the depedencies
RUN pip install virtualenv

RUN . venv/bin/activate
RUN pip install -r requirements.txt

# 3. Migrate with the database
# RUN make migrate

# 4. Run the server

EXPOSE 8080
CMD ["uwsgi", "wsgi.ini"]