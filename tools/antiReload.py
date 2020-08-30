import os
import time
import sys


def antiReload():
    dummy = open("../app/tools-buffer/dummy.tsx", "ab")
    dummy.write(bytes("//dummyline \n", "utf-8"))
    dummy.close()


if __name__ == "__main__":
    try:
        while True:
            time.sleep(60)
            print("[Sys] Adding new line to dummmy.tsx")
            antiReload()

    except KeyboardInterrupt:
        print("[Sys] Exiting...")
        raise
    except:
        print("[Sys] Jaa nee")
        sys.exit()
