from flask import request
from frstservice.controller import bp
from service import food_service as food_serv
from model.food import Food
from model.response import Response
from model.order import Order


@bp.route("/foods")
def get_foods():
    orders = []

    order_by = request.args.get("order_by")
    if order_by != None:
        order_by = order_by.split(",")

        order_name = None
        order_direction = None

        for o in order_by:
            if o.endswith('_desc'):
                order_name = o.split("_desc")[0]
                order_direction = "desc"
            else:
                order_name = o.split("_asc")[0]
                order_direction = "asc"

            orders.append(Order(order_name, order_direction))

    return Response(data=food_serv.get_foods(orders)).__dict__


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
