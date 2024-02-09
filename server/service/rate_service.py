import repository.rate_repo as rate_repo
from exception.notfound import NotFoundError


def get_rates():
    return rate_repo.get_rates()

def get_one(id):
    return rate_repo.get_one(id)

def get_rates_pagination(start, limit):
    return rate_repo.get_rates_pagination(start, limit)

def add_rate(rate):
    check_if_exist_by_value(rate.value)

    return rate_repo.add_rate(rate)


def update_rate(id, rate):
    if rate_repo.get_one(id) == None:
        raise NotFoundError()

    check_if_exist_by_value(rate.value)

    return rate_repo.update_rate(id, rate)


def delete_rate(id):
    if rate_repo.get_one(id) == None:
        raise NotFoundError(message="Not found")

    return rate_repo.delete_rate(id)

def check_if_exist_by_value(value):
    if rate_repo.get_one_by_value(value) != None:
        raise ValueError("Rate with such value exist.")