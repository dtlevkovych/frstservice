from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/ping")
def test_page():
    return "pong"

from server.controller import bp as ctrl
app.register_blueprint(ctrl)