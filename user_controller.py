import user_service as user_serv
from user import User
from flask import request
import main as main
from response import Response

@main.app.route("/users")
def get_users():
    order_by = request.args.get("order_by")
    if order_by != None:
        order_by = order_by.split(",")

    order_dir = request.args.get("order_dir")
    #order_dir = asc, desc, None
    if order_dir != "asc" and order_dir != "desc":
        order_dir = None

    return Response(data=user_serv.get_all(order_by, order_dir)).__dict__

@main.app.route("/user/<id>")
def get_user(id):
    return Response(data=user_serv.get_one(id)).__dict__

@main.app.route("/user", methods = ["POST"])
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

        
@main.app.route("/user/<id>", methods = ["PUT"])
def update_user(id):
    data = request.get_json()
    firstName = data["firstName"]
    lastName = data["lastName"]
    age = data["age"]

    user = User(firstName, lastName, age)
    result = user_serv.update(id, user)

    if result == False:
        return Response(error_msg="Not Found", status=False).__dict__, 404

    return Response().__dict__, 200

@main.app.route("/user/<id>", methods = ["DELETE"])
def delete_user(id):
    result = user_serv.delete(id)

    if result == False:
        return Response(error_msg="Not Found", status=False).__dict__, 404

    return Response().__dict__, 200
