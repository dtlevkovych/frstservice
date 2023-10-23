import sqlite3
from sqlite3 import Error
import os.path

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_FILE_NAME = os.path.join(BASE_DIR, "../db/user.db")

def get_conn():
    conn = None

    try:
        conn = sqlite3.connect(DB_FILE_NAME)
    except Error as e:
        print(e)

    return conn

