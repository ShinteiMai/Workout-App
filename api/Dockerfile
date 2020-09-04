FROM python:3.8.5

# 0. Set the working directory to .
WORKDIR /app

# 1. Copy the current directory . into the container at /app
ADD . /app

# 2. Install all the depedencies
RUN make install

# 3. Migrate with the database
RUN make migrate

# 4. Run the server
RUN make production


