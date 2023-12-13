import repository.db_conn as db_conn
import repository.db_tools as db_tools
from model.userfood import UserFood


def get_conn():
    return db_conn.get_conn()


def get_all():
    conn = get_conn()

    cur = conn.cursor()
    sql = "select id, user_id, food_id from user_food"
            
    cur.execute(sql)

    rows = cur.fetchall()
    print(rows)

    return [UserFood(r[0], r[1], r[2]) for r in rows]


def get_one_by_id(userId, foodId):
    conn = get_conn()

    cur = conn.cursor()
    user_food_params = (userId, foodId)
    cur.execute("select id, user_id, food_id from user_food where user_id=? and food_id=?", user_food_params)

    rows = cur.fetchall()

    for r in rows:
        return UserFood(r[0], r[1], r[2]).toJson()

    return None


def add(userFood):
    conn = get_conn()

    cur = conn.cursor()
    id = db_tools.get_next_id()
    user_food_params = (id, userFood.userId, userFood.foodId)
    sql = "insert into user_food (id, user_id, food_id, created_at) values (?, ?, ?, unixepoch() * 1000)"
            
    cur.execute(sql, user_food_params)

    conn.commit()

    return id