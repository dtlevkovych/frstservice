from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager, login_required
import os, time
from service import auth_user_service
import base64

app = Flask(__name__)
app.secret_key = os.urandom(24)

CORS(app)

login_manager = LoginManager()
login_manager.init_app(app)

def get_auth_id(request):
    auth_id = request.headers.get('Authorization')
    if auth_id:
        auth_id = auth_id.replace('Basic ', '', 1)

    return auth_id

@login_manager.request_loader
def load_user_from_request(request):
    auth_id = get_auth_id(request)
    auth_user = auth_user_service.get_user_by_id(auth_id)

    success = auth_user and auth_user.expiredAt > round(time.time() * 1000)


    return auth_user if success else None

@app.route("/ping")
@login_required
def test_page():
    return "pong"

from server.controller import bp as ctrl
app.register_blueprint(ctrl, url_prefix="/api")