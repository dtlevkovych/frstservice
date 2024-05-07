import requests
from flask import Flask, request
import os
import time
import json
from model.authuser import AuthUser
from repository import auth_user_repo
from oauthlib.oauth2 import WebApplicationClient
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)
PROVIDER_NAME = "google"
GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", None)
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", None)
GOOGLE_DISCOVERY_URL = (
    "https://accounts.google.com/.well-known/openid-configuration"
)
AUTH_LIFETIME = 3 * 60 * 1000 # 120 minutes

client = WebApplicationClient(GOOGLE_CLIENT_ID)

def get_google_provider_cfg():
    return requests.get(GOOGLE_DISCOVERY_URL).json()

def get_redirect_uri():
    google_provider_cfg = get_google_provider_cfg()
    authorization_endpoint = google_provider_cfg["authorization_endpoint"]

    uri = request.base_url + "/callback"
    request_uri = client.prepare_request_uri(
        authorization_endpoint,
        redirect_uri=uri,
        scope=["openid", "email", "profile"],
    )

    return request_uri

def login_callback():
    code = request.args.get("code")

    google_provider_cfg = get_google_provider_cfg()
    token_endpoint = google_provider_cfg["token_endpoint"]
    
    token_url, headers, body = client.prepare_token_request(
        token_endpoint,
        authorization_response=request.url,
        redirect_url=request.base_url,
        code=code
    )
    token_response = requests.post(
        token_url,
        headers=headers,
        data=body,
        auth=(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET),
    )

    client.parse_request_body_response(json.dumps(token_response.json()))

    userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
    uri, headers, body = client.add_token(userinfo_endpoint)
    userinfo_response = requests.get(uri, headers=headers, data=body)

    if userinfo_response.json().get("email_verified"):
        unique_id = userinfo_response.json()["sub"]
        users_email = userinfo_response.json()["email"]
        picture = userinfo_response.json()["picture"]
        users_name = userinfo_response.json()["given_name"]
    else:
        return "User email not available or not verified by Google.", 400

    print(unique_id)
    print(users_name)
    print(users_email)
    print(picture)

    expiredAt = round(time.time() * 1000) + AUTH_LIFETIME

    authuser = AuthUser(authenticationId=unique_id, username=users_email, provider=PROVIDER_NAME, email=users_email, name=users_name, profilePic=picture, expiredAt=expiredAt)

    if auth_user_repo.get_user_by_id(authuser.authenticationId) != None:
        auth_user_repo.update_user_by_id(authuser.authenticationId, authuser)
    else:
        auth_user_repo.create_user(authuser)

    return authuser.get_id()