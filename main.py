from flask import Flask
from user import User

users = []

app = Flask(__name__)

def add_user(firstName, lastName):
    user = User(firstName, lastName)
    users.append(user)

@app.route("/users")
def get_users():
    return users

add_user("Dmytro", "Levkovych")
add_user("Daryna", "Levkovych")
