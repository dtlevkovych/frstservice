from model.userfood import UserFood

class UserFoodDetailed(UserFood):
    def __init__(self, id, userId, foodId, name, rateId):
        super().__init__(id, userId, foodId)
        self.name = name
        self.rateId = rateId

    def toJson(self):
        json = super().toJson
        json["name"] = name
        json["rateId"] = rateId
        return json