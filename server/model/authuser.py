from flask_login import UserMixin

class AuthUser(UserMixin):
    def __init__(self, authenticationId, username, provider, email, name, profilePic, updatedDate=0):
        self.authenticationId = authenticationId
        self.username = username
        self.provider = provider
        self.email = email
        self.name = name
        self.profilePic = profilePic
        self.updatedDate = updatedDate

    def get_id(self):
        return self.authenticationId

    def toJson(self):
        return {"authenticationId": self.authenticationId, "username": self.username, "provider": self.provider, "email": self.email, "name": self.name, "profilePic": self.profilePic, "updatedDate": self.updatedDate}