
import os
import time
import sys


def antiReload():
    dummy = open("../app/tools-buffer/dummy.tsx", "ab")
    dummy.write(bytes("//dummyline \n", "utf-8"))
    dummy.close()


if __name__ == "__main__":
    print('[anti_reload] initializing anti_reload script...')
    try:
        while True:
            time.sleep(60)
            print("[anti_reload] Adding new line to dummmy.tsx")
            antiReload()

    except KeyboardInterrupt:
        print("[anti_reload] exiting script...")
        raise
    except:
        print("[anti_reload] Jaa nee!")
        sys.exit()