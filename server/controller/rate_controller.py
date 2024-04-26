from flask import request
from server.controller import bp
from service import rate_service as rate_serv
from model.response import Response
from model.rate import Rate


@bp.route("/rates")
def get_rates():
    return Response(data=[r.__dict__ for r in rate_serv.get_rates()]).__dict__


@bp.route("/rate/<id>")
def get_rate(id):
    rate = rate_serv.get_one(id)

    if rate == None:
        raise NotFoundError("Rate not found.")
        
    return Response(data=rate.__dict__).__dict__

@bp.route("/rates/pagination")
def get_rates_pagination():
    limit = request.args.get("limit")
    page = request.args.get("page")

    if limit == None:
        limit = 10

    if page == None:
        page = 0
    
    start = int(page) * int(limit)

    return Response(data=[u.__dict__ for u in rate_serv.get_rates_pagination(start, int(limit))]).__dict__

@bp.route("/rate", methods = ["POST"])
def add_rate():
    data = request.get_json()
    name = data["name"]
    value = data["value"]
    colorHex = data["colorHex"]

    rate = Rate(None, name, value, colorHex)
    id = rate_serv.add_rate(rate)
    return Response(data=id).__dict__, 201


@bp.route("/rate/<id>", methods = ["PUT"])
def update_rate(id):
    data = request.get_json()
    name = data["name"]
    value = data["value"]
    colorHex = data["colorHex"]

    rate = Rate(id, name, value, colorHex)

    rate_serv.update_rate(id, rate)
    return Response().__dict__, 200


@bp.route("/rate/<id>", methods = ["DELETE"])
def delete_rate(id):
    rate_serv.delete_rate(id)
    return Response().__dict__, 200