from flask import request
from flask_login import login_required
from server.controller import bp
from model.response import Response
from model.userfood import UserFood
from service import user_food_service as user_food_serv
from exception.notfound import NotFoundError

API_USERFOODS = "/userfoods"

@bp.route(API_USERFOODS)
@login_required
def get_all():
    return Response(data=[u.__dict__ for u in user_food_serv.get_all()]).__dict__, 201

@bp.route(API_USERFOODS + "/user/<id>")
@login_required
def get_all_by_user_id(id):
    return Response(data=[u.__dict__ for u in user_food_serv.get_all_by_user_id(id)]).__dict__, 201

@bp.route(API_USERFOODS + "/user/<id>/pagination")
@login_required
def get_by_user_id_pagination(id):
    limit = request.args.get("limit")
    page = request.args.get("page")

    if limit == None:
        limit = 10

    if page == None:
        page = 0
    
    start = int(page) * int(limit)

    return Response(data=[u.__dict__ for u in user_food_serv.get_by_user_id_pagination(id, start, limit)]).__dict__, 201

@bp.route(API_USERFOODS + "/user/<userId>/food/<foodId>")
@login_required
def get_one_by_id(userId, foodId):
    user_food = user_food_serv.get_one_by_id(userId, foodId)

    if user_food == None:
        raise NotFoundError("User food not found.")
        
    return Response(data=user_food.__dict__).__dict__

@bp.route(API_USERFOODS + "/eatinghealth/user/<userId>")
@login_required
def get_eating_health_report(userId):
    return Response(data=[r.__dict__ for r in user_food_serv.get_eating_health_report(userId)]).__dict__

@bp.route(API_USERFOODS, methods = ["POST"])
@login_required
def add():
    data = request.get_json()
    userId = data["userId"]
    foodId = data["foodId"]

    userFood = UserFood(None, userId, foodId)
    id = user_food_serv.add(userFood)
    return Response(data=id).__dict__, 201


@bp.route(API_USERFOODS + "/<id>", methods = ["DELETE"])
@login_required
def delete_userfood(id):
    user_food_serv.delete(id)
    return Response().__dict__, 200