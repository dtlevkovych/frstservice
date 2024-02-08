import repository.db_conn as db_conn
import repository.db_tools as db_tools
from model.rate import Rate


def get_conn():
    return db_conn.get_conn()

def get_rates():
    conn = get_conn()

    cur = conn.cursor()
    sql = "select id, name, value, created_at from rate"

    cur.execute(sql)
            
    rows = cur.fetchall()

    return [Rate(r[0], r[1], r[2], r[3]) for r in rows]

def get_one(id):
    conn = get_conn()

    cur = conn.cursor()
    rate_params = (id,)
    cur.execute("select id, name, value, created_at from rate where id=? limit 0,1", rate_params)

    rows = cur.fetchall()

    for r in rows:
        return Rate(r[0], r[1], r[2], r[3])

    return None

def get_rates_pagination(start, limit):
    conn = get_conn()

    cur = conn.cursor()
    rate_params = (start, limit)
    cur.execute("select id, name, value, created_at from rate order by value limit ?,?", rate_params)

    rows = cur.fetchall()

    return [Rate(r[0], r[1], r[2], r[3]) for r in rows]

def add_rate(rate):
    conn = get_conn()

    cur = conn.cursor()

    id = db_tools.get_next_id()

    rate_params = (id, rate.name, rate.value)
    cur.execute("insert into rate (id, name, value, created_at) values (?, ?, ?, unixepoch() * 1000)", rate_params)
    conn.commit()
    
    return id


def update_rate(id, rate):
    conn = get_conn()

    cur = conn.cursor()
    rate_params = (rate.name, rate.value, id)
    cur.execute("update rate set name=?, value=? where id=?", rate_params)
    conn.commit()

    return True

def delete_rate(id):
    conn = get_conn()
    cur = conn.cursor()
    rate_params = (id,)
    cur.execute("delete from rate where id=?", rate_params)
    conn.commit()

    return True