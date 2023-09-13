import user_service as user_serv
from user import User
from flask import request
import main as main

@main.app.route("/users")
def get_users():
    all = request.args.get("all")
    if all == "true":
        all = True
    else:
        all = False
    return user_serv.get_all(all)

@main.app.route("/user/<id>")
def get_user(id):
    return user_serv.get_one(id)

@main.app.route("/user", methods = ["POST"])
def add_user():
    data = request.get_json()
    firstName = data["firstName"]
    lastName = data["lastName"]
    age = data["age"]

    user = User(firstName, lastName, age)
    user_serv.add(user)
    return ""

@main.app.route("/user/<id>", methods = ["UPDATE"])
def update_user(id):
    data = request.get_json()
    firstName = data["firstName"]
    lastName = data["lastName"]
    age = data["age"]

    user = User(firstName, lastName, age)
    user_serv.update(id, user)
    return ""

@main.app.route("/user/<id>", methods = ["DELETE"])
def delete_user(id):
    user_serv.delete(id)
    return ""
