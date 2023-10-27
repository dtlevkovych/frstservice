class Food:

    def __init__(self, id, name, rate):
        self.id = id
        self.name = name

        if rate < 1 or rate > 3:
            raise ValueError("rate must be 1-good, 2-neutral, 3-bad")
        self.rate = rate


    def toJson(self):
        return {"id": self.id, "name": self.name, "rate": self.rate}