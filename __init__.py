from flask import Flask

app = Flask(__name__)

@app.route("/ping")
def test_page():
    return "pong"

from frstservice.controller import bp as usr_ctrl
app.register_blueprint(usr_ctrl)