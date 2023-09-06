import json
from flask import Flask, request
from user import User

users = []

app = Flask(__name__)

@app.route("/user", methods = ["POST"])
def add_user():
    data = request.get_json()
    firstName = data["firstName"]
    lastName = data["lastName"]
    age = data["age"]

    user = User(firstName, lastName, age)
    users.append(user)
    return ""

@app.route("/users")
def get_users():
    return [u.toJson() for u in users]


