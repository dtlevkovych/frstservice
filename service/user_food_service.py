from repository import user_repo, food_repo, user_food_repo
from model.userfood import UserFood


def get_all():
    return [u.__dict__ for u in user_food_repo.get_all()]


def get_one_by_id(userId, foodId):
    return user_food_repo.get_one_by_id(userId, foodId)


def add(userFood):
    if user_repo.get_one(userFood.userId) == None:
        raise ValueError("Wrong user id")
    
    if food_repo.get_one(userFood.foodId) == None:
        raise ValueError("Wrong food id")

    return user_food_repo.add(userFood)