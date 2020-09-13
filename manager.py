import argparse
import subprocess
import os
import sys
from threading import Thread 

from tools.localtunnel import localtunnel
from tools.anti_reload import anti_reload

def react_native():
    os.chdir(os.path.abspath(os.path.dirname(__file__) + "app"))
    command = ["yarn", "start"]
    subprocess.call(command)

def flask():
    commands = [
        ["make", "run"]
    ]
    os.chdir(os.path.abspath(os.path.dirname(__file__) + "api"))
    for command in commands:
        subprocess.call(command)

# app dev setup
def app():
    threads = [
        Thread(target=react_native),
        Thread(target=anti_reload),
        Thread(target=localtunnel),
    ]
    threading(threads)

def api():
    threads = [
        Thread(target=flask)
    ]
    threading(threads)

def threading(threads):
    try:
        for thread in threads:
            thread.start()
        
        for thread in threads:
            thread.join()
    except KeyboardInterrupt:
        sys.exit()


def main():
    parser = argparse.ArgumentParser(description="Manage development setup")
    parser.add_argument('app', metavar='A', type=str, help='Choose between "app" or "api" to start the necessary development server')
    selection = parser.parse_args().app
    if selection == "app":
        app()
    elif selection == "api":
        api()
    else:
        print('Invalid argument. Choose between "app" or "api" to start the chosen development server')

main()
