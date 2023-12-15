import repository.rate_repo as rate_repo



def get_rates():
    return [f.__dict__ for f in rate_repo.get_rates()]

def add_rate(rate):
    return rate_repo.add_rate(rate)