from flask import request
from service import user_service as user_serv
from model.response import Response
from model.user import User
from model.order import Order
from server.controller import bp
from exception.notfound import NotFoundError
from flask_login import login_required

@bp.route("/users")
@login_required
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
@login_required
def get_users_pagination():
    limit = request.args.get("limit")
    page = request.args.get("page")

    if limit == None:
        limit = 10

    if page == None:
        page = 0
    
    start = int(page) * int(limit)

    return Response(data=[u.__dict__ for u in user_serv.get_users_pagination(start, int(limit))]).__dict__

@bp.route("/user/<id>")
@login_required
def get_user(id):
    user = user_serv.get_one(id)

    if user == None:
        raise NotFoundError("User not found.")

    return Response(data=user.__dict__).__dict__

@bp.route("/user", methods = ["POST"])
@login_required
def add_user():
    data = request.get_json()
    firstName = data["firstName"]
    lastName = data["lastName"]
    dob = data["dob"]

    user = User(firstName, lastName, dob)
    id = user_serv.add(user)
    return Response(data={"id": id}).__dict__, 201

        
@bp.route("/user/<id>", methods = ["PUT"])
@login_required
def update_user(id):
    data = request.get_json()
    firstName = data["firstName"]
    lastName = data["lastName"]
    dob = data["dob"]

    user = User(firstName, lastName, dob)
    
    user_serv.update(id, user)
    return Response().__dict__, 200


@bp.route("/user/<id>", methods = ["DELETE"])
@login_required
def delete_user(id):
    user_serv.delete(id)
    return Response().__dict__, 200