import subprocess
import re

process = subprocess.Popen(['docker', 'ps', '-a'],
                           stdout=subprocess.PIPE, stderr=subprocess.PIPE)
out, err = process.communicate()

docker_pattern = re.compile(r"""
    ^(.*) # slice the beginning part
    (NAMES\\n(\w+))\s
    (.*)$ # slice the after part 
    """, re.VERBOSE)

result = docker_pattern.search(str(out)).group(3)

process = subprocess.Popen(
    ['docker', 'inspect', '-f', "'{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'", result], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
out, err = process.communicate()

# ipv4 regex (stupid way)
var = re.findall(r"'.*'", str(out))[0]
result1 = var.replace("'", "")
print(result1)
