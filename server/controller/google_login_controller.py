from server.controller import bp
from service import google_auth as google_auth_serv
from flask import redirect, request, url_for

@bp.route("/google/login")
def login():
    request_uri = google_auth_serv.get_redirect_uri()
    return redirect(request_uri)

@bp.route("/google/login/callback")
def login_callback():
    google_auth_serv.login_callback()

    return redirect("http://localhost:5173/user")