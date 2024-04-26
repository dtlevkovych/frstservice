import repository.db_conn as db_conn
import repository.db_tools as db_tools
from model.authuser import AuthUser

def get_conn():
    return db_conn.get_conn()

def get_all_users():
    conn = get_conn()

    cur = conn.cursor()
    sql = "select authentication_id, username, provider, name, profile_pic from auth_user"

    cur.execute(sql)
            
    rows = cur.fetchall()

    return [AuthUser(r[0], r[1], r[2], r[3], r[4]) for r in rows]

def get_user_by_id(id):
    conn = get_conn()

    cur = conn.cursor()
    auth_user_params = (id,)
    cur.execute("select authentication_id, username, provider, name, profile_pic from auth_user where authentication_id=?", auth_user_params)
            
    rows = cur.fetchall()

    for r in rows:
        return AuthUser(r[0], r[1], r[2], r[3], r[4])

    return None

def create_user(authuser):
    conn = get_conn()

    cur = conn.cursor()

    auth_user_params = (authuser.authenticationId, authuser.username, authuser.provider, authuser.name, authuser.profilePic)
    cur.execute("insert into auth_user (authentication_id, username, provider, name, profile_pic) values (?, ?, ?, ?, ?)", auth_user_params)
    conn.commit()
    
    return authuser.authenticationId

def update_user_by_id(id, authuser):
    conn = get_conn()

    cur = conn.cursor()
    auth_user_params = (authuser.username, authuser.provider, authuser.name, authuser.profilePic, authuser.authenticationId)
    cur.execute("update auth_user set username=?, provider=?, name=?, profile_pic=? where authentication_id=?", auth_user_params)
    conn.commit()

    return True

def delete_user_by_id(id):
    conn = get_conn()

    cur = conn.cursor()
    auth_user_params = (id,)
    cur.execute("delete from auth_user where id=?", auth_user_params)
    conn.commit()

    return True
