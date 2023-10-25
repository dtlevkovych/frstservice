import repository.db_conn as db_conn
import repository.db_tools as db_tools
from model.food import Food
from model.order import Order

def get_conn():
    return db_conn.get_conn()

def add(food):
    conn = get_conn()

    cur = conn.cursor()

    id = db_tools.get_next_id()

    food_params = (id, food.name, food.rate)
    cur.execute("insert into food (id, name, rate) values (?, ?, ?)", food_params)
    conn.commit()
    
    return id

def get_foods(orders):
    conn = get_conn()

    cur = conn.cursor()
    sql = "select id, name, rate from food"

    if orders != None:
        sql = sql + " order by "
        for i in range(len(orders)):
            if i > 0:
                sql = sql + ","
            sql = sql + orders[i].name + " " + orders[i].direction
            
    cur.execute(sql)

    rows = cur.fetchall()

    return [Food(r[0], r[1], r[2]) for r in rows]

