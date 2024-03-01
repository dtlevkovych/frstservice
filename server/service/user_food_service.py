from repository import user_repo, food_repo, user_food_repo
from model.userfood import UserFood
from exception.notfound import NotFoundError


def get_all():
    return user_food_repo.get_all()
    

def get_all_by_user_id(userId):
    return user_food_repo.get_all_by_user_id(userId)


def get_one_by_id(userId, foodId):
    return user_food_repo.get_one_by_id(userId, foodId)

def get_eating_health_report(userId):
    total_count = 0
    result = user_food_repo.get_eating_health_report(userId)
    for r in result:
        total_count = total_count + r["count"]
    print(total_count)
    return [{"value": r["value"], "colorHex": r["colorHex"], "percentage": round(r["count"] * 100 / total_count)} for r in result]

def add(userFood):
    if user_repo.get_one(userFood.userId) == None:
        raise ValueError("Wrong user id")
    
    if food_repo.get_one(userFood.foodId) == None:
        raise ValueError("Wrong food id")

    return user_food_repo.add(userFood)

def delete(id):
    if user_food_repo.get_one(id) == None:
        raise NotFoundError(message="Not found")

    return user_food_repo.delete(id)