import user_repo as repo

def get_all(order_by, order_dir):
        
    return [u.__dict__ for u in repo.get_all(order_by, order_dir)]

def get_one(id):
    return repo.get_one(id)

def add(user):
    existing_user = repo.get_one_by_name(user.firstName, user.lastName)

    if existing_user != None:
        raise ValueError("User with such first and last name allready exist")

    return repo.add(user)

def update(id, user):
    if repo.get_one(id) == None:
        return False

    return repo.update(id, user)


def delete(id):
    if repo.get_one(id) == None:
        return False 

    return repo.delete(id)

