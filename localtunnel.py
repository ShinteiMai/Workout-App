# make sure that you have localtunnel installed
# sudo npm install -g localtunnel
import sys
import re
import json
from subprocess import Popen, CalledProcessError, PIPE

port = int(input('[port] enter your flask API port: '))
command = ['lt', '-h', 'http://serverless.social', '-p', str(port)]

try:
    with Popen(command, stdout=PIPE, bufsize=1, universal_newlines=True) as p:
        for line in p.stdout:
            print(line, end='')  # process line here
            url = re.findall('https://.*', line)[0]
            with open('localtunnel.json', 'w') as file:
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
