import repository.food_repo as food_repo
from exception.notfound import NotFoundError


def get_foods(orders):
    return [f.__dict__ for f in food_repo.get_foods(orders)]


def get_one(id):
    return food_repo.get_one(id)


def add(food):
    return food_repo.add(food)


def update(id, food):
    if food_repo.get_one(id) == None:
        raise NotFoundError()

    return food_repo.update(id, food)