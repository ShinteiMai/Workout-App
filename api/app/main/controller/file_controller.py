from flask import request
from flask_restx import Resource, Namespace, fields, reqparse
from marshmallow import ValidationError

from ..service.file_service import FileService as file_service

import base64
import os
import subprocess

api = Namespace('file', description="File related operations")


@api.route('')
class Files(Resource):
    @api.doc('Get list of routines')
    def get(self):
        pass

    @api.doc('Create a new routine')
    def post(self):
        body = request.get_json(force=True)

        image = body["image"]["_parts"][0][1]["picture"]
        filename = body["image"]["_parts"][0][1]["name"]
        file_service.upload_image(image, filename)
        # print(img)
        # filename = "test.jpg"
        # basedir = os.path.abspath(os.path.dirname(
        #     __file__) + "../../../../images/")
        # with open(os.path.join(basedir, filename), "wb") as f:
        #     # with open(filename, "wb") as f:
        #     print("CURRENT DICKRETORI: ")
        #     subprocess.call(["pwd"])
        #     f.write(img)
        # f.close()


@api.route('/<id>')
@api.param('id', 'Routine ID')
class File(Resource):
    @api.doc('Fetch a single rooutine with the specified id')
    def get(self, id):
        pass

    @api.doc('Update a routine ')
    def put(self, id):
        pass

    @api.doc('Delete a routine with the specified id')
    def delete(self, id):
        pass
