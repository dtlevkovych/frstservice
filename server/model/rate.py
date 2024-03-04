class Rate:
    def __init__(self, id, name, value, colorHex, createdAt = 0):
        self.id = id
        self.name = name
        self.value = value
        self.colorHex = colorHex
        self.createdAt = createdAt

    def toJson(self):
        return {"id": self.id, "name": self.name, "value": self.value, "colorHex": self.colorHex, "createdAt": self.createdAt}