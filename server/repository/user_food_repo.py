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

    return [UserFood(r[0], r[1], r[2]) for r in rows]


def get_all_by_user_id(userId):
    conn = get_conn()

    cur = conn.cursor()
    user_food_params = (userId,)
    sql = "select id, user_id, food_id from user_food where user_id=?"

    cur.execute(sql, user_food_params)
    rows = cur.fetchall()

    return [UserFood(r[0], r[1], r[2]) for r in rows]


def get_eating_health_report(userId):
    conn = get_conn()

    cur = conn.cursor()
    user_food_params = (userId,)
    sql = """
        SELECT r.value, r.color_hex, count(*) as count 
        FROM user_food AS uf 
        INNER JOIN food AS f ON uf.food_id=f.id 
        INNER JOIN rate AS r ON f.rate_id = r.id 
        WHERE uf.user_id=? 
        GROUP BY r.value 
        ORDER BY r.value"""

    cur.execute(sql, user_food_params)
    rows = cur.fetchall()
    
    return [{"value": r[0], "colorHex": r[1], "count": r[2]} for r in rows]

def get_one_by_id(userId, foodId):
    conn = get_conn()

    cur = conn.cursor()
    user_food_params = (userId, foodId)
    cur.execute("select id, user_id, food_id from user_food where user_id=? and food_id=?", user_food_params)

    rows = cur.fetchall()

    for r in rows:
        return UserFood(r[0], r[1], r[2])

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

def get_one(id):
    conn = get_conn()

    cur = conn.cursor()
    user_food_params = (id,)
    cur.execute("select id, user_id, food_id from user_food where id=? limit 0,1", user_food_params)

    rows = cur.fetchall()

    for r in rows:
        return UserFood(r[0], r[1], r[2])

    return None

def delete(id):
    conn = get_conn()
    cur = conn.cursor()
    user_food_params = (id,)
    cur.execute("delete from user_food where id=?", user_food_params)
    conn.commit()

    return True