import json
from flask import Flask
from user import User

users = []

app = Flask(__name__)

def add_user(firstName, lastName, age):
    user = User(firstName, lastName, age)
    users.append(user)

@app.route("/users")
def get_users():
    return [u.toJson() for u in users]

def fill_users():
    add_user("Dmytro", "Levkovych", 16)
    add_user("Daryna", "Levkovych", 11)

fill_users()

