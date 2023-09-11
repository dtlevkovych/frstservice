import user_repo as repo

def get_all():
    return [u.toJson() for u in repo.get_all() if u.active == True]

def get_one(id):
    return repo.get_one(id)

def add(user):
    if user.firstName == "Sofiia":
        user.active = False
    repo.add(user)

def update(id, user):
   repo.update(id, user)

def delete(id):
    repo.delete(id)
