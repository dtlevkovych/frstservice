class Food:

    def __init__(self, id, name, rateId):
        self.id = id
        self.name = name
        self.rateId = rateId


    def toJson(self):
        return {"id": self.id, "name": self.name, "rateId": self.rateId}