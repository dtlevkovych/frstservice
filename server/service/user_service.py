from repository import user_repo as repo
from service import user_food_service as userfood_service
from exception.notfound import NotFoundError


def get_all(orders):
    return repo.get_all(orders)

def get_users_pagination(start, limit):
    return repo.get_users_pagination(start, limit)

def get_one(id):
    return repo.get_one(id)

def add(user):
    existing_user = repo.get_one_by_name(user.firstName, user.lastName)

    if existing_user != None:
        raise ValueError("User with such first and last name allready exist")

    return repo.add(user)

def update(id, user):
    if repo.get_one(id) == None:
        raise NotFoundError()

    return repo.update(id, user)


def delete(id):
    if repo.get_one(id) == None:
        raise NotFoundError(message="Not found")

    result = repo.delete(id)
    userfood_service.delete_userfood_by_user_id(id)
    return result