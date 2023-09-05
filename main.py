import json
from flask import Flask, jsonify
from user import User

users = []

app = Flask(__name__)

def add_user(firstName, lastName):
    user = User(firstName, lastName)
    users.append(user)

@app.route("/users")
def get_users():
    return [u.toJson() for u in users]

def fill_users():
    add_user("Dmytro", "Levkovych")
    add_user("Daryna", "Levkovych")

fill_users()

