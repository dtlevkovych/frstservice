import repository.food_repo as food_repo
from exception.notfound import NotFoundError


def get_foods(orders):
    return food_repo.get_foods(orders)


def get_one(id):
    return food_repo.get_one(id)


def add(food):
    if food_repo.get_one_by_name(food.name) != None:
        raise ValueError("Food with such name allready exist")

    return food_repo.add(food)


def update(id, food):
    same_name_food = food_repo.get_one_by_name(food.name)
    if same_name_food != None and id != same_name_food.id:
        raise ValueError("Food with such name allready exist")

    if food_repo.get_one(id) == None:
        raise NotFoundError()

    return food_repo.update(id, food)


def delete(id):
    if food_repo.get_one(id) == None:
        raise NotFoundError(message="Not found")

    return food_repo.delete(id)

