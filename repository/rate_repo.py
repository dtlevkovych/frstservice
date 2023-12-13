import repository.db_conn as db_conn
import repository.db_tools as db_tools


def get_conn():
    return db_conn.get_conn()

def add_rate(rate):
    conn = get_conn()

    cur = conn.cursor()

    id = db_tools.get_next_id()

    rate_params = (id, rate.name, rate.value)
    cur.execute("insert into rate (id, name, value, created_at) values (?, ?, ?, unixepoch() * 1000)", rate_params)
    conn.commit()
    
    return id