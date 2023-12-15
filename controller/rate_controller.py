from flask import request
from frstservice.controller import bp
from service import rate_service as rate_serv
from model.response import Response
from model.rate import Rate


@bp.route("/rates")
def get_rates():
    return Response(data=rate_serv.get_rates()).__dict__
    

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