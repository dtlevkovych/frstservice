import repository.rate_repo as rate_repo
from exception.notfound import NotFoundError


def get_rates():
    return [f.__dict__ for f in rate_repo.get_rates()]

def get_one(id):
    return rate_repo.get_one(id)

def add_rate(rate):
    return rate_repo.add_rate(rate)


def update_rate(id, rate):
    if rate_repo.get_one(id) == None:
        raise NotFoundError()

    return rate_repo.update_rate(id, rate)


def delete_rate(id):
    if rate_repo.get_one(id) == None:
        return False

    return rate_repo.delete_rate(id)