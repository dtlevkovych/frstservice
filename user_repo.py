import uuid

users = {}

def get_all():
    return [u.toJson() for u in list(users.values())]

def get_one(id):
    return users[id].toJson()

def add(user):
    user.id = get_next_id()
    users[user.id] = user

def update():
    pass

def delete(id):
    users.pop(id)

def get_next_id():
    return str(uuid.uuid4())