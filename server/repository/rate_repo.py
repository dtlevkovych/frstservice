import repository.db_conn as db_conn
import repository.db_tools as db_tools
from model.rate import Rate
import utils.timeutils as timeutils


def get_conn():
    return db_conn.get_conn()

def get_rates():
    conn = get_conn()

    cur = conn.cursor()
    sql = "select id, name, value, color_hex, created_at from rate"

    cur.execute(sql)
            
    rows = cur.fetchall()

    return [Rate(r[0], r[1], r[2], r[3], r[4]) for r in rows]

def get_one(id):
    conn = get_conn()

    cur = conn.cursor()
    rate_params = (id,)
    cur.execute("select id, name, value, color_hex, created_at from rate where id=? limit 0,1", rate_params)

    rows = cur.fetchall()

    for r in rows:
        return Rate(r[0], r[1], r[2], r[3], r[4])

    return None

def get_one_by_value(value, id=None):
    return get_one_by_attr("value", value, id)

def get_one_by_name(name, id=None):
    return get_one_by_attr("name", name, id)

def get_one_by_attr(attr_name, attr_value, id=None):
    conn = get_conn()

    cur = conn.cursor()
    rate_params = (attr_value,) if id == None else (attr_value, id,)

    sql = "select id, name, value, color_hex, created_at from rate where " + attr_name  + "=?" + ("" if id == None else " and id<>?")

    cur.execute(sql, rate_params)

    rows = cur.fetchall()

    for r in rows:
        return Rate(r[0], r[1], r[2], r[3], r[4])

    return None

def get_rates_pagination(start, limit):
    conn = get_conn()

    cur = conn.cursor()
    rate_params = (start, limit)
    cur.execute("select id, name, value, color_hex, created_at from rate order by value limit ?,?", rate_params)

    rows = cur.fetchall()

    return [Rate(r[0], r[1], r[2], r[3], r[4]) for r in rows]

def add_rate(rate):
    conn = get_conn()

    cur = conn.cursor()

    id = db_tools.get_next_id()

    rate_params = (id, rate.name, rate.value, rate.colorHex, timeutils.current_time_millis())
    cur.execute("insert into rate (id, name, value, color_hex, created_at) values (?, ?, ?, ?, ?)", rate_params)
    conn.commit()
    
    return id


def update_rate(id, rate):
    conn = get_conn()

    cur = conn.cursor()
    rate_params = (rate.name, rate.value, rate.colorHex, id)
    cur.execute("update rate set name=?, value=?, color_hex=? where id=?", rate_params)
    conn.commit()

    return True

def delete_rate(id):
    conn = get_conn()
    cur = conn.cursor()
    rate_params = (id,)
    cur.execute("delete from rate where id=?", rate_params)
    conn.commit()

    return True