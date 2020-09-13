# stronk

Workout App for Chads, presented by Chad Academy.

## Development Setup

### Server

#### Prerequisites for Flask API

Make sure that you have these packages installed:

- [Make](https://www.gnu.org/software/make/)
- [python3](https://www.python.org/)

If you are using Windows, make sure to read this [Installation Guide](https://stackoverflow.com/questions/32127524/how-to-install-and-use-make-in-windows) and [Running Guide](https://stackoverflow.com/questions/2532234/how-to-run-a-makefile-in-windows) to run Makefile at Windows. 

1; Change directory to api/

```bash
cd api/
```

2; Install all the dependencies for the flask api

```bash
make install
```

3; Fill in the .env in the api/ directory

Follow the example at .env.example for setupping your database setup,
For example this is my .env contents that i use for development, just leave the ENVIRONMENT and SECRET_KEY to default, adjust the database to the one that you're going to be using

```env
# Environment
ENVIRONMENT="dev"

# Database
POSTGRES_DB="stronk"
POSTGRES_USER="postgres"
POSTGRES_HOSTNAME="localhost"
POSTGRES_PASSWORD="admin"

# Secret key
SECRET_KEY="example"
```

4; Create a PostgreSQL Database with the name of POSTGRES_DB that you have defined before in the .env file

5; Run initial migratiion to populate the POSTGRES_DB tables, make sure that you are still in the api/ directory because we need to execute the Makefile 

```bash
make migrate
```

6; Run the api

```bash
make run
```

7; Lastly, you have to port-forward the connection into a localtunnel so your phone can access that API from a certain URL, we already have made a script just to handle and abstract that process.

```bash
sudo npm install -g localtunnel
cd tools/
python3 localtunnel.py
```

8; Happy hacking!

### React Native App


#### Prerequisites for React Native

Make sure that you have these packages installed:

- [yarn](https://yarnpkg.com/)
- [python3](https://www.python.org/)

1; Change directory to app/

```bash
cd app/
```

2; Install dependencies

```bash
yarn
```

3; Start the Expo development server

```bash
yarn start
```

4; Open [http://localhost:19002](http://localhost:19002) and change the connection type into *Localtunnel*

5; Scan the barcode with the *Expo* application in your phone, and let if you have "Downloading JavaScript Bundle" Screen, you're good to go.

6; Other than that you have to run another python script to make sure that the Expo app keeps running because if you left it idle for more than 2 minutes, there is a chance that the Expo development server will shutdown.

Open another terminal in your text editor or preferred terminal, and
run these commands

```bash
cd tools
python3 anti_reload.py
```

6; Happy hacking!
