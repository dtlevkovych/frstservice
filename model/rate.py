class Rate:
    def __init__(self, id, name, value, createdAt = 0):
        self.id = id
        self.name = name
        self.value = value
        self.createdAt = createdAt

    def toJson(self):
        return {"id": self.id, "name": self.name, "rate": self.rate, "createdAt": self.createdAt}