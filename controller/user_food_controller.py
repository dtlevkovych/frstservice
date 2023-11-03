from flask import request
from frstservice.controller import bp
from model.response import Response
from service import user_food_service as user_food_serv


@bp.route("/userfood", methods = ["POST"])
def add():
    data = request.get_json()
    userId = data["userId"]
    foodId = data["foodId"]

    try:
        id = user_food_serv.add(userId, foodId)
        return Response(data=id).__dict__, 201
    except Exception as e:
        return Response(status=False, error_msg=e.__str__()).__dict__, 400