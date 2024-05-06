from flask import request
from flask_login import login_required
from server.controller import bp
from service import food_service as food_serv
from model.food import Food
from model.response import Response
from model.order import Order
from exception.notfound import NotFoundError

@bp.route("/foods")
@login_required
def get_foods():
    orders = []

    order_by = request.args.get("order_by")
    phrase = request.args.get("phrase")
    
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

    return Response(data=[f.__dict__ for f in food_serv.get_foods(orders, phrase)]).__dict__
    

@bp.route("/food", methods = ["POST"])
@login_required
def add_food():
    data = request.get_json()
    name = data["name"]
    rateId = data["rateId"]

    food = Food(None, name, rateId)
    id = food_serv.add(food)
    return Response(data={"id": id}).__dict__, 201

@bp.route("/foods/pagination")
@login_required
def get_foods_pagination():
    limit = request.args.get("limit")
    page = request.args.get("page")

    if limit == None:
        limit = 10

    if page == None:
        page = 0
    
    start = int(page) * int(limit)

    return Response(data=[f.__dict__ for f in food_serv.get_foods_pagination(start, int(limit))]).__dict__

@bp.route("/food/<id>")
@login_required
def get_food(id):
    food = food_serv.get_one(id)

    if food == None:
        raise NotFoundError("Food not found.")

    return Response(data=food.__dict__).__dict__

@bp.route("/food/<id>", methods = ["PUT"])
@login_required
def update(id):
    data = request.get_json()
    name = data["name"]
    rateId = data["rateId"]

    food = Food(id, name, rateId)

    food_serv.update(id, food)
    return Response().__dict__, 200

@bp.route("/food/<id>", methods = ["DELETE"])
@login_required
def delete(id):
    food_serv.delete(id)
    return Response().__dict__, 200