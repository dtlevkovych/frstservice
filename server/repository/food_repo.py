import repository.db_conn as db_conn
import repository.db_tools as db_tools
from model.food import Food


def get_conn():
    return db_conn.get_conn()


def get_foods(orders, phrase):
    conn = get_conn()

    cur = conn.cursor()
    
    sql = "select id, name, rate_id from food "

    food_params = ()
    if phrase != None:
        food_params = ("%" + phrase + "%",)
        sql += "where name like ?"

    sql += db_tools.get_order_text(orders)

    cur.execute(sql, food_params)
            
    rows = cur.fetchall()

    return [Food(r[0], r[1], r[2]) for r in rows]

def get_foods_pagination(start, limit):
    conn = get_conn()

    cur = conn.cursor()
    food_params = (start, limit)
    cur.execute("select id, name, rate_id from food order by name limit ?,?", food_params)

    rows = cur.fetchall()

    return [Food(r[0], r[1], r[2]) for r in rows]

def add(food):
    conn = get_conn()

    cur = conn.cursor()

    id = db_tools.get_next_id()

    food_params = (id, food.name, food.rateId)
    cur.execute("insert into food (id, name, rate_id) values (?, ?, ?)", food_params)
    conn.commit()
    
    return id


def get_one(id):
    conn = get_conn()

    cur = conn.cursor()
    food_params = (id,)
    cur.execute("select id, name, rate_id from food where id=? limit 0,1", food_params)

    rows = cur.fetchall()

    for r in rows:
        return Food(r[0], r[1], r[2])

    return None


def get_one_by_name(name):
    conn = get_conn()

    cur = conn.cursor()
    food_params = (name,)
    cur.execute("select id, name, rate_id from food where name=?", food_params)

    rows = cur.fetchall()

    for r in rows:
        return Food(r[0], r[1], r[2])

    return None

def search_by_name(phrase):
    conn = get_conn()

    cur = conn.cursor()
    food_params = (phrase,)
    cur.execute("select id, name, rate_id from food where name like '%?%'", food_params)

    rows = cur.fetchall()

    return [Food(r[0], r[1], r[2]) for r in rows]

def update(id, food):
    conn = get_conn()

    cur = conn.cursor()
    food_params = (food.name, food.rateId, id)
    cur.execute("update food set name=?, rate_id=? where id=?", food_params)
    conn.commit()

    return True


def delete(id):
    conn = get_conn()
    cur = conn.cursor()
    food_params = (id,)
    cur.execute("delete from food where id=?", food_params)
    conn.commit()

    return True