import json

class User:
    def __init__(self, firstName, lastName):
        self.firstName = firstName
        self.lastName = lastName

    def getFirstName(self):
        return self.firstName

    def getLastName(self):
        return self.lastName

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__)