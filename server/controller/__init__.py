from flask import Blueprint

bp = Blueprint('main', __name__)

from server.controller import user_controller
from server.controller import food_controller
from server.controller import user_food_controller
from server.controller import rate_controller
from server.controller import google_login_controller

from server.controller import exception_handler