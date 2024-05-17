from server.controller import bp
from service import google_auth as google_auth_serv
from flask import redirect, request
import json

@bp.route("/google/login")
def login():
    redirect_to = request.args.get("redirect_to")
    request_uri = google_auth_serv.get_redirect_uri(redirect_to)
    return redirect(request_uri)

@bp.route("/google/login/callback")
def login_callback():
    auth_id = google_auth_serv.login_callback()
    url = get_redirect_url_with_auth(auth_id)

    return redirect(url)

def get_redirect_url_with_auth(auth_id):
    url = get_redirect_url()
    url += get_query_separator(url)
    url += "auth_id=" + auth_id

    return url

def get_query_separator(url):
    return "&" if url.find("?") > -1 else "?"

def get_redirect_url():
    url = None

    state = request.args.get("state")
    if state:
        state = state.replace("'",'"')
        redirect_to = json.loads(state)
        if 'redirect_to' in redirect_to:
            url = redirect_to['redirect_to']

    return url