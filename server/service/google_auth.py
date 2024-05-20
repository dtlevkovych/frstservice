import requests
from flask import request
import os
import time
import json
from model.authuser import AuthUser
from service import auth_user_service
from oauthlib.oauth2 import WebApplicationClient

PROVIDER_NAME = "google"
GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", None)
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", None)
GOOGLE_DISCOVERY_URL = (
    "https://accounts.google.com/.well-known/openid-configuration"
)
AUTH_LIFETIME = 3 * 60 * 1000 # 120 minutes
BASE_API_URL = os.environ.get("BASE_API_URL", None)

client = WebApplicationClient(GOOGLE_CLIENT_ID)

def get_google_provider_cfg():
    return requests.get(GOOGLE_DISCOVERY_URL).json()

def get_redirect_uri(redirect_to):
    google_provider_cfg = get_google_provider_cfg()
    authorization_endpoint = google_provider_cfg["authorization_endpoint"]

    uri = BASE_API_URL + "/google/login/callback"
    request_uri = client.prepare_request_uri(
        authorization_endpoint,
        redirect_uri=uri,
        scope=["openid", "email", "profile"],
        state = {"redirect_to": redirect_to}
    )

    return request_uri

def login_callback():
    code = request.args.get("code")

    google_provider_cfg = get_google_provider_cfg()
    token_endpoint = google_provider_cfg["token_endpoint"]
    
    token_url, headers, body = client.prepare_token_request(
        token_endpoint,
        authorization_response=request.url,
        redirect_url=BASE_API_URL,
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

    expiredAt = round(time.time() * 1000) + AUTH_LIFETIME

    authuser = AuthUser(authenticationId=unique_id, username=users_email, provider=PROVIDER_NAME, email=users_email, name=users_name, profilePic=picture, expiredAt=expiredAt)

    if auth_user_service.get_user_by_id(authuser.authenticationId) != None:
        auth_user_service.update_user_by_id(authuser.authenticationId, authuser)
    else:
        auth_user_service.create_user(authuser)

    return authuser.get_id()