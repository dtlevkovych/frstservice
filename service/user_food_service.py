from repository import user_repo, food_repo, user_food_repo


def add(userId, foodId):
    if user_repo.get_one(userId) == None:
        raise ValueError("Wrong user id")
    
    if food_repo.get_one(foodId) == None:
        raise ValueError("Wrong food id")

    return user_food_repo.add(userId, foodId)