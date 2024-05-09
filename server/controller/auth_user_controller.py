from model.response import Response
from server.controller import bp
from service import auth_user_service as auth_user_serv
from flask_login import login_required
from flask import redirect
from flask_login import current_user

@bp.route("/google/authusers")
def get_all_users():
    return Response(data=[u.__dict__ for u in auth_user_serv.get_all_users()]).__dict__, 201

@bp.route("google/authuser/<id>")
def get_user_by_id(id):
    return Response(data=auth_user_serv.get_user_by_id(id).__dict__).__dict__

def get_auth_from_header():
    auth_header = request.headers.get('Authorization')

    if auth_header:
        auth_header_arr = auth_header.split(" ")
        auth_header = auth_header_arr[len(auth_header_arr) - 1]
    
    return auth_header

@bp.route("/logout")
#@login_required
def logout():
    auth_id = get_auth_from_header()
    print("User logged out.")
    print(auth_id)
    if auth_id:
        auth_user_serv.delete_user_by_id(auth_id)
        
    return redirect("http://localhost:5173/")
