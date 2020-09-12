import os
import time
import sys

def anti_reload():
    print('anti-reload script for react-native started (60s reload)')
    path = os.path.abspath(os.path.dirname(__file__) + "/../app/buffer/dummy.tsx")
    dummy = open(path, "ab")
    dummy.write(bytes("//dummyline \n", "utf-8"))
    dummy.close()

    try:
        while True:
            time.sleep(60)
            print("[Sys] Adding new line to dummmy.tsx")
            anti_reload()
    except:
        sys.exit()