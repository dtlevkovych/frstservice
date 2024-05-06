from model.response import Response
from server.controller import bp
from service import auth_user_service as auth_user_serv
from flask_login import logout_user, login_required
from flask import redirect

@bp.route("/google/authusers")
def get_all_users():
    return Response(data=[u.__dict__ for u in auth_user_serv.get_all_users()]).__dict__, 201

@bp.route("google/authuser/<id>")
def get_user_by_id(id):
    return Response(data=auth_user_serv.get_user_by_id(id).__dict__).__dict__

@bp.route("/logout")
#@login_required
def logout():
    print("User logged out.")
    print(current_user)
    logout_user()
    return redirect("http://localhost:5173/")
