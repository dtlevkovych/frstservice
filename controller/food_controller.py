from flask import request
from frstservice.controller import bp
from service import food_service as food_serv
from model.food import Food
from model.response import Response

@bp.route("/food", methods = ["POST"] )
def add_food():
    data = request.get_json()
    name = data["name"]
    rate = data["rate"]

    try:
        food = Food(None, name, rate)
        id = food_serv.add(food)
        return Response(data={"id": id}).__dict__, 201
    except ValueError as e:
        return Response(error_msg=e.__str__(), status=False).__dict__, 400