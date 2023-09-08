import json
from flask import Flask, request
from user import User
import user_repo as user_repo


app = Flask(__name__)

@app.route("/users")
def get_users():
    return user_repo.get_all()

@app.route("/user/<id>")
def get_user(id):
    return user_repo.get_one(id)

@app.route("/user", methods = ["POST"])
def add_user():
    data = request.get_json()
    firstName = data["firstName"]
    lastName = data["lastName"]
    age = data["age"]

    user = User(firstName, lastName, age)
    user_repo.add(user)
    return ""

@app.route("/user/<id>", methods = ["UPDATE"])
def update_user(id):
    data = request.get_json()
    firstName = data["firstName"]
    lastName = data["lastName"]
    age = data["age"]

    user = User(firstName, lastName, age)
    user_repo.update(id, user)
    return ""

@app.route("/user/<id>", methods = ["DELETE"])
def delete_user(id):
    user_repo.delete(id)
    return ""
