
class User:
    def __init__(self, firstName, lastName, age):
        self.firstName = firstName
        self.lastName = lastName
        self.age = age
        self.id = None
        self.active = True

    def toJson(self):
        return {"firstName": self.firstName, "lastName": self.lastName, "age": self.age, "id": self.id}