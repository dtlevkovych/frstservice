from flask import request
from server.controller import bp
from model.response import Response
from model.userfood import UserFood
from service import user_food_service as user_food_serv
from exception.notfound import NotFoundError

API_USERFOODS = "/userfoods"

@bp.route(API_USERFOODS)
def get_all():
    return Response(data=[u.__dict__ for u in user_food_serv.get_all()]).__dict__, 201

@bp.route(API_USERFOODS + "/user/<id>")
def get_all_by_user_id(id):
    return Response(data=[u.__dict__ for u in user_food_serv.get_all_by_user_id(id)]).__dict__, 201

@bp.route(API_USERFOODS + "/user/<userId>/food/<foodId>")
def get_one_by_id(userId, foodId):
    return Response(data=user_food_serv.get_one_by_id(userId, foodId).__dict__).__dict__

@bp.route(API_USERFOODS + "/eatinghealth/user/<userId>")
def get_eating_health_report(userId):
    return Response(data=[r.__dict__ for r in user_food_serv.get_eating_health_report(userId)]).__dict__

@bp.route(API_USERFOODS, methods = ["POST"])
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


@bp.route(API_USERFOODS + "/<id>", methods = ["DELETE"])
def delete_userfood(id):

    try:
        user_food_serv.delete(id)
        return Response().__dict__, 200
    except Exception as e:
         return Response(error_msg=e.__str__(), status=False).__dict__, 404