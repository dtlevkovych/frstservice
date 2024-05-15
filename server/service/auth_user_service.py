from repository import auth_user_repo

def get_all_users():
    return auth_user_repo.get_all_users()

def get_user_by_id(id):
    return auth_user_repo.get_user_by_id(id)

def create_user(authuser):
    return auth_user_repo.create_user(authuser)

def update_user_by_id(id, authuser):
    return auth_user_repo.update_user_by_id(id, authuser)

def delete_user_by_id(id):
    return auth_user_repo.delete_user_by_id(id)