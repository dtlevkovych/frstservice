class UserFood:

    def __init__(self, id, userId, foodId):
        self.id = id
        self.userId = userId
        self.foodId = foodId

    
    def toJson(self):
        return {"id": self.id, "userId": self.userId, "foodId": self.foodId}
