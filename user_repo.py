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


def get_all():
    conn = get_conn()

    cur = conn.cursor()
    cur.execute("select first_name, last_name, age, id, active from user")

    rows = cur.fetchall()

    return [User(r[0], r[1], r[2], r[3], r[4]) for r in rows]


def get_one(id):
    conn = get_conn()

    cur = conn.cursor()
    user_params = (id,)
    cur.execute("select first_name, last_name, age, id, active from user where id=? limit 0,1", user_params)

    rows = cur.fetchall()

    for r in rows:
        user = User(r[0], r[1], r[2], r[3], r[4])
        return user.toJson()

    return None


def add(user):
    conn = get_conn()

    cur = conn.cursor()

    id = get_next_id()

    user_params = (id, user.firstName, user.lastName, user.age, user.active)
    cur.execute("insert into user (id, first_name, last_name, age, active) values (?, ?, ?, ?, ?)", user_params)
    conn.commit()
    
    return id

def update(id, user):
    conn = get_conn()

    cur = conn.cursor()
    user_params = (user.firstName, user.lastName, user.age, user.active, id)
    cur.execute("update user set first_name=?, last_name=?, age=?, active=? where id=?", user_params)
    conn.commit()

    return True


def delete(id):
    conn = get_conn()

    cur = conn.cursor()
    user_params = (id,)
    cur.execute("delete from user where id=?", user_params)
    conn.commit()

    return True


def get_next_id():
    return str(uuid.uuid4())