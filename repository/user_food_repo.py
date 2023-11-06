import repository.db_conn as db_conn
import repository.db_tools as db_tools


def get_conn():
    return db_conn.get_conn()


def add(userId, foodId):
    conn = get_conn()

    cur = conn.cursor()
    id = db_tools.get_next_id()
    user_food_params = (id, userId, foodId)
    sql = "insert into user_food (id, user_id, food_id, created_at) values (?, ?, ?, unixepoch() * 1000)"
            
    cur.execute(sql, user_food_params)

    return id
