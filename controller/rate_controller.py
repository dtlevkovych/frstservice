from flask import request
from frstservice.controller import bp
from service import rate_service as rate_serv
from model.response import Response
from model.rate import Rate


@bp.route("/rates")
def get_rates():
    return Response(data=[r.__dict__ for r in rate_serv.get_rates()]).__dict__


@bp.route("/rate/<id>")
def get_rate(id):
    return Response(data=rate_serv.get_one(id).__dict__).__dict__


@bp.route("/rate", methods = ["POST"])
def add_rate():
    data = request.get_json()
    name = data["name"]
    value = data["value"]

    try:
        rate = Rate(None, name, value)
        id = rate_serv.add_rate(rate)
        return Response(data=id).__dict__, 201
    except ValueError as e:
        return Response(error_msg=e.__str__(), status=False).__dict__, 400


@bp.route("/rate/<id>", methods = ["PUT"])
def update_rate(id):
    data = request.get_json()
    name = data["name"]
    value = data["value"]

    rate = Rate(id, name, value)

    try:
        rate_serv.update_rate(id, rate)
        return Response().__dict__, 200
    except Exception as e:
        return Response(error_msg=e.__str__(), status=False).__dict__, 404


@bp.route("/rate/<id>", methods = ["DELETE"])
def delete_rate(id):
    result = rate_serv.delete_rate(id)

    if result == False:
         return Response(error_msg="Not Found", status=False).__dict__, 404

    return Response().__dict__, 200