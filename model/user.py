
class User:
    def __init__(self, firstName, lastName, age, id = None, active = True, updatedAt = 0):
        self.firstName = firstName
        self.lastName = lastName
        self.age = age
        self.id = id
        self.active = active
        self.updatedAt = updatedAt

    def toJson(self):
        return {"firstName": self.firstName, "lastName": self.lastName, "age": self.age, "id": self.id, "updatedAt": self.updatedAt}