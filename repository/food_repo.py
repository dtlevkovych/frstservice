import repository.db_conn as db_conn
import repository.db_tools as db_tools

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
