from flask import request
from frstservice.controller import bp
from model.response import Response
from model.userfood import UserFood
from service import user_food_service as user_food_serv


@bp.route("/userfoods")
def get_all():
    return Response(data=[u.__dict__ for u in user_food_serv.get_all()]).__dict__, 201

@bp.route("/userfoods/user/<id>")
def get_all_by_user_id(id):
    return Response(data=[u.__dict__ for u in user_food_serv.get_all_by_user_id(id)]).__dict__, 201

@bp.route("/userfood/user/<userId>/food/<foodId>")
def get_one_by_id(userId, foodId):
    return Response(data=user_food_serv.get_one_by_id(userId, foodId).__dict__).__dict__


@bp.route("/userfood", methods = ["POST"])
def add():
    data = request.get_json()
    userId = data["userId"]
    foodId = data["foodId"]

    try:
        userFood = UserFood(None, userId, foodId)
        id = user_food_serv.add(userFood)
        return Response(data=id).__dict__, 201
    except Exception as e:
        return Response(status=False, error_msg=e.__str__()).__dict__, 400


@bp.route("/userfood/<id>", methods = ["DELETE"])
def delete_userfood(id):
    result = user_food_serv.delete(id)

    if result == False:
         return Response(error_msg="Not Found", status=False).__dict__, 404

    return Response().__dict__, 200

