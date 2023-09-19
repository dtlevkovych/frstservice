import uuid
import sqlite3
from sqlite3 import Error
from user import User
import os.path

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_FILE_NAME = os.path.join(BASE_DIR, "db/user.db")

def get_conn():
    conn = None

    try:
        conn = sqlite3.connect(DB_FILE_NAME)
    except Error as e:
        print(e)

    return conn






users = {}

def get_all():
    conn = get_conn()

    cur = conn.cursor()
    cur.execute("select * from user")

    rows = cur.fetchall()

    return [User(r["first_name"], r["last_name"], r["age"], r["id"], r["active"]) for r in rows]

def get_one(id):
    return users[id].toJson()

def add(user):
    user.id = get_next_id()
    users[user.id] = user

def update(id, user):
    user.id = id
    users[id] = user

def delete(id):
    users.pop(id)

def get_next_id():
    return str(uuid.uuid4())