from flask import request
from frstservice.controller import bp
from service import food_service as food_serv
from model.food import Food
from model.response import Response
from model.order import Order
from exception.notfound import NotFoundError

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

    return Response(data=[f.__dict__ for f in food_serv.get_foods(orders)]).__dict__
    

@bp.route("/food", methods = ["POST"])
def add_food():
    data = request.get_json()
    name = data["name"]
    rateId = data["rateId"]

    try:
        food = Food(None, name, rateId)
        id = food_serv.add(food)
        return Response(data={"id": id}).__dict__, 201
    except ValueError as e:
        return Response(error_msg=e.__str__(), status=False).__dict__, 400


@bp.route("/food/<id>")
def get_food(id):
    return Response(data=food_serv.get_one(id).__dict__).__dict__


@bp.route("/food/<id>", methods = ["PUT"])
def update(id):
    data = request.get_json()
    name = data["name"]
    rateId = data["rateId"]

    food = Food(id, name, rateId)

    try:
        food_serv.update(id, food)
        return Response().__dict__, 200
    except Exception as e:
        return Response(error_msg=e.__str__(), status=False).__dict__, 404


@bp.route("/food/<id>", methods = ["DELETE"])
def delete(id):

    try:
        food_serv.delete(id)
        return Response().__dict__, 200
    except Exception as e:
        return Response(error_msg=e.__str__(), status=False).__dict__, 404