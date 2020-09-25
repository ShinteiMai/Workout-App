
import base64
import os
import subprocess


class FileService():

    @staticmethod
    def upload_image(image, filename):
        image_decoded = base64.b64decode(image)
        basedir = os.path.abspath(os.path.dirname(
            __file__) + "../../../../images/")
        with open(os.path.join(basedir, filename), "wb") as f:
            subprocess.call(["pwd"])
            f.write(image_decoded)
            f.close()
