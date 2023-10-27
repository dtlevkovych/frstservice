import repository.db_conn as db_conn
import repository.db_tools as db_tools
from model.food import Food
from model.order import Order


def get_conn():
    return db_conn.get_conn()


def get_foods(orders):
    conn = get_conn()

    cur = conn.cursor()
    sql = "select id, name, rate from food" + db_tools.get_order_text(orders)

    cur.execute(sql)
            
    rows = cur.fetchall()

    return [Food(r[0], r[1], r[2]) for r in rows]


def add(food):
    conn = get_conn()

    cur = conn.cursor()

    id = db_tools.get_next_id()

    food_params = (id, food.name, food.rate)
    cur.execute("insert into food (id, name, rate) values (?, ?, ?)", food_params)
    conn.commit()
    
    return id


def get_one(id):
    conn = get_conn()

    cur = conn.cursor()
    food_params = (id,)
    cur.execute("select id, name, rate from food where id=? limit 0,1", food_params)

    rows = cur.fetchall()

    for r in rows:
        food = Food(r[0], r[1], r[2],)
        return food.toJson()

    return None


def update(id, food):
    conn = get_conn()

    cur = conn.cursor()
    food_params = (food.name, food.rate, id)
    cur.execute("update food set name=?, rate=? where id=?", food_params)
    conn.commit()

    return True