# make sure that you have localtunnel installed
# sudo npm install -g localtunnel
import sys
import re
import json
import os
import threading
import time
from subprocess import Popen, CalledProcessError, PIPE

# port = int(input('[port] enter your flask API port: '))
# command = ['lt', '-h', 'http://serverless.social', '-p', str(port)]


def localtunnel():
    command = ['lt', '-h', 'http://serverless.social', '-p', '4000']
    try:
        with Popen(command, stdout=PIPE, bufsize=1, universal_newlines=True) as p:
            for line in p.stdout:
                print(line, end='')  # process line here
                url = re.findall('https://.*', line)[0]
                with open('../app/tools-buffer/localtunnel.json', 'w') as file:
                    json.dump({
                        "url": url
                    }, file)
                print(
                    "[sys] localtunnel url: {} was written into ./localtunnel.json".format(url))

        if p.returncode != 0:
            raise CalledProcessError(p.returncode, p.args)
    except KeyboardInterrupt:
        print('\n[sys] exiting localtunnel server')
        sys.exit()


def backend():
    os.chdir("../server")
    os.system("python3 app.py")


localtunnelThread = threading.Thread(target=localtunnel)
backendThread = threading.Thread(target=backend)

localtunnelThread.start()
time.sleep(5)
# backendThread.start()
backend()
