from flask import request
from service import user_service as user_serv
from model.response import Response
from model.user import User
from model.order import Order
from frstservice.controller import bp
from exception.notfound import NotFoundError


@bp.route("/users")
def get_users():
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

    return Response(data=user_serv.get_all(orders)).__dict__

@bp.route("/user/<id>")
def get_user(id):
    return Response(data=user_serv.get_one(id)).__dict__

@bp.route("/user", methods = ["POST"])
def add_user():
    data = request.get_json()
    firstName = data["firstName"]
    lastName = data["lastName"]
    age = data["age"]

    user = User(firstName, lastName, age)

    try:
        id = user_serv.add(user)
        return Response(data={"id": id}).__dict__, 201
    except ValueError as e:
        return Response(error_msg=e.__str__(), status=False).__dict__, 400

        
@bp.route("/user/<id>", methods = ["PUT"])
def update_user(id):
    data = request.get_json()
    firstName = data["firstName"]
    lastName = data["lastName"]
    age = data["age"]

    user = User(firstName, lastName, age)
    
    try:
        user_serv.update(id, user)
        return Response().__dict__, 200
    except Exception as e:
        return Response(error_msg=e.__str__(), status=False).__dict__, 404


@bp.route("/user/<id>", methods = ["DELETE"])
def delete_user(id):
    result = user_serv.delete(id)

    if result == False:
        return Response(error_msg="Not Found", status=False).__dict__, 404

    return Response().__dict__, 200
