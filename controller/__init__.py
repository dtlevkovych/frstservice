from flask import Blueprint

bp = Blueprint('main', __name__)

from frstservice.controller import user_controller
from frstservice.controller import food_controller
from frstservice.controller import user_food_controller
from frstservice.controller import rate_controller