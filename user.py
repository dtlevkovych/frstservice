
class User:
    def __init__(self, firstName, lastName, age):
        self.firstName = firstName
        self.lastName = lastName
        self.age = age
        self.id = None

    def getFirstName(self):
        return self.firstName

    def getLastName(self):
        return self.lastName

    def getAge(self):
        return self.age

    def toJson(self):
        return {"firstName": self.firstName, "lastName": self.lastName, "age": self.age, "id": self.id}