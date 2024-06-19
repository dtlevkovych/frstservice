import repository.db_conn as db_conn
from model.authuser import AuthUser
import utils.timeutils as timeutils

def get_conn():
    return db_conn.get_conn()

def get_all_users():
    conn = get_conn()

    cur = conn.cursor()
    sql = "select authentication_id, username, provider, email, name, profile_pic, expired_at, updated_date from auth_user"

    cur.execute(sql)
            
    rows = cur.fetchall()

    return [AuthUser(authenticationId=r[0], username=r[1], provider=r[2], email=r[3], name=r[4], profilePic=r[5], expiredAt=r[6], updatedDate=r[7]) for r in rows]

def get_user_by_id(id):
    conn = get_conn()

    cur = conn.cursor()
    auth_user_params = (id,)
    cur.execute("select authentication_id, username, provider, email, name, profile_pic, expired_at, updated_date from auth_user where authentication_id=?", auth_user_params)
            
    rows = cur.fetchall()

    for r in rows:
        return AuthUser(authenticationId=r[0], username=r[1], provider=r[2], email=r[3], name=r[4], profilePic=r[5], expiredAt=r[6], updatedDate=r[7])

    return None

def create_user(authuser):
    conn = get_conn()

    cur = conn.cursor()

    auth_user_params = (authuser.authenticationId, authuser.username, authuser.provider, authuser.email, authuser.name, authuser.expiredAt, authuser.profilePic, timeutils.current_time_millis())
    cur.execute("insert into auth_user (authentication_id, username, provider, email, name, expired_at, profile_pic, updated_date) values (?, ?, ?, ?, ?, ?, ?, ?)", auth_user_params)
    conn.commit()
    
    return authuser.authenticationId

def update_user_by_id(id, authuser):
    conn = get_conn()

    cur = conn.cursor()
    auth_user_params = (authuser.username, authuser.provider, authuser.email, authuser.name, authuser.profilePic, authuser.expiredAt, timeutils.current_time_millis(), authuser.authenticationId)
    cur.execute("update auth_user set username=?, provider=?, email=?, name=?, profile_pic=?, expired_at=?, updated_date=? where authentication_id=?", auth_user_params)
    conn.commit()

    return True

def delete_user_by_id(id):
    conn = get_conn()

    cur = conn.cursor()
    auth_user_params = (id,)
    cur.execute("delete from auth_user where authentication_id=?", auth_user_params)
    conn.commit()

    return True
