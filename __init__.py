from flask import Flask

app = Flask(__name__)

@app.route("/ping")
def test_page():
    return "pong"

from frstservice.controller import bp as user_ctrl
app.register_blueprint(user_ctrl)