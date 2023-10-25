import repository.food_repo as food_repo


def get_foods(orders):
    return [f.__dict__ for f in food_repo.get_foods(orders)]


def add(food):
    return food_repo.add(food)
