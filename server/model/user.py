
class User:
    def __init__(self, firstName, lastName, dob, id = None, active = True, createdAt = 0):
        self.firstName = firstName
        self.lastName = lastName
        self.dob = dob
        self.id = id
        self.active = active
        self.createdAt = createdAt

    def toJson(self):
        return {"firstName": self.firstName, "lastName": self.lastName, "dob": self.dob, "id": self.id, "createdAt": self.createdAt}