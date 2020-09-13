class Response():
    def json(self, data, message, status_code):
        return [{
            "data": data,
            "message": message,
        }, status_code]
