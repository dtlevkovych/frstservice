class Response:
    def __init__(self, status=True, data=None, error_msg=None):
        self.status = status
        self.data = data
        self.error_msg = error_msg