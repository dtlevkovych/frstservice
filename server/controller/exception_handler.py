from server.controller import bp
from model.response import Response

@bp.app_errorhandler(Exception)
def errorHandler_500(error):
    return Response(error_msg="Oops, something went wrong!", status=False).__dict__, 500