from model.order import Order
from model.user import User
import repository.db_conn as db_conn
import repository.db_tools as db_tools

def get_conn():
    return db_conn.get_conn()

def get_all(orders):
    conn = get_conn()

    cur = conn.cursor()
    sql = "select first_name, last_name, age, id, active, created_at from user" + db_tools.get_order_text(orders)
            
    cur.execute(sql)

    rows = cur.fetchall()

    return [User(r[0], r[1], r[2], r[3], r[4], r[5]) for r in rows]


def get_one(id):
    conn = get_conn()

    cur = conn.cursor()
    user_params = (id,)
    cur.execute("select first_name, last_name, age, id, active, created_at from user where id=? limit 0,1", user_params)

    rows = cur.fetchall()

    for r in rows:
        return User(r[0], r[1], r[2], r[3], r[4], r[5])

    return None


def get_one_by_name(firstName, lastName):
    conn = get_conn()

    cur = conn.cursor()
    user_params = (firstName, lastName)
    cur.execute("select first_name, last_name, age, id, active, created_at from user where first_name=? and last_name=?", user_params)

    row = cur.fetchone()
    
    return None if row == None else User(row[0], row[1], row[2], row[3], row[4], row[5])


def add(user):
    conn = get_conn()

    cur = conn.cursor()

    id = db_tools.get_next_id()

    user_params = (id, user.firstName, user.lastName, user.age, user.active)
    cur.execute("insert into user (id, first_name, last_name, age, active, created_at) values (?, ?, ?, ?, ?, unixepoch() * 1000)", user_params)
    conn.commit()
    
    return id

def update(id, user):
    conn = get_conn()

    cur = conn.cursor()
    user_params = (user.firstName, user.lastName, user.age, user.active, id)
    cur.execute("update user set first_name=?, last_name=?, age=?, active=? where id=?", user_params)
    conn.commit()

    return True


def delete(id):
    conn = get_conn()

    cur = conn.cursor()
    user_params = (id,)
    cur.execute("delete from user where id=?", user_params)
    conn.commit()

    return True

