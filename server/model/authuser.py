class AuthUser:
    def __init__(self, authenticationId, username, provider, user, profilePic):
        self.authenticationId = authenticationId
        self.username = username
        self.provider = provider
        self.user = user
        self.profilePic = profilePic

    def toJson(self):
        return {"authenticationId": self.authenticationId, "username": self.username, "provider": self.provider, "user": self.user, "profilePic": self.profilePic}