from flask import request
from service import user_service as user_serv
from model.response import Response
from model.user import User
from model.order import Order
from server.controller import bp
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

    return Response(data=[u.__dict__ for u in user_serv.get_all(orders)]).__dict__

@bp.route("/users/pagination")
def get_users_pagination():
    limit = request.args.get("limit")
    since = request.args.get("since")

    return Response(data=[u.__dict__ for u in user_serv.get_users_pagination(limit, since)]).__dict__

@bp.route("/user/<id>")
def get_user(id):
    return Response(data=user_serv.get_one(id).__dict__).__dict__

@bp.route("/user", methods = ["POST"])
def add_user():
    data = request.get_json()
    firstName = data["firstName"]
    lastName = data["lastName"]
    dob = data["dob"]

    try:
        user = User(firstName, lastName, dob)
        id = user_serv.add(user)
        return Response(data={"id": id}).__dict__, 201
    except ValueError as e:
        return Response(error_msg=e.__str__(), status=False).__dict__, 400

        
@bp.route("/user/<id>", methods = ["PUT"])
def update_user(id):
    data = request.get_json()
    firstName = data["firstName"]
    lastName = data["lastName"]
    dob = data["dob"]

    user = User(firstName, lastName, dob)
    
    try:
        user_serv.update(id, user)
        return Response().__dict__, 200
    except Exception as e:
        return Response(error_msg=e.__str__(), status=False).__dict__, 404


@bp.route("/user/<id>", methods = ["DELETE"])
def delete_user(id):
    
    try:
        user_serv.delete(id)
        return Response().__dict__, 200
    except Exception as e:
        return Response(error_msg=e.__str__(), status=False).__dict__, 404