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
EXPOSE 8080
# 4. Run the server
CMD ["make", "production"]