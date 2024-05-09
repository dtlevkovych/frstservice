from server.controller import bp
from service import google_auth as google_auth_serv
from flask import redirect, request, url_for
from model.response import Response

@bp.route("/google/login")
def login():
    print("login")
    request_uri = google_auth_serv.get_redirect_uri()
    return redirect(request_uri)

@bp.route("/google/login/callback")
def login_callback():
    print("callback")
    auth_id = google_auth_serv.login_callback()

    #return Response(data={"auth_id": auth_id}).__dict__, 201
    return redirect("http://localhost:5173/user")