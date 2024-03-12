from model.rate import Rate

class RateReport(Rate):
    def __init__(self, id, name, value, colorHex, createdAt = 0, count=0):
        super().__init__(id, name, value, colorHex, createdAt)
        self.count = count

    def toJson(self):
        json = super().toJson
        json["count"] = count
        return json