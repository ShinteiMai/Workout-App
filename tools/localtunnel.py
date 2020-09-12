# make sure that you have localtunnel installed
# sudo npm install -g localtunnel
import sys
import re
import json
import os
import threading
import time
from subprocess import Popen, CalledProcessError, PIPE


def localtunnel():
    command = ['lt', '-h', 'http://serverless.social', '-p', '8080']
    path = os.path.abspath(os.path.dirname(__file__) + "/../app/buffer/localtunnel.json")
    try:
        with Popen(command, stdout=PIPE, bufsize=1, universal_newlines=True) as p:
            for line in p.stdout:
                print(line, end='')  # process line here
                url = re.findall('https://.*', line)[0]
                with open(path, 'w') as file:
                    json.dump({
                        "url": url
                    }, file)
        if p.returncode != 0:
            raise CalledProcessError(p.returncode, p.args)
    except KeyboardInterrupt:
        print('\nExiting localtunnel server')
        sys.exit()