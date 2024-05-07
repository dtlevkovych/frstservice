from server.controller import bp
from model.response import Response
from exception.notfound import NotFoundError
from werkzeug.exceptions import HTTPException


@bp.app_errorhandler(ValueError)
def errorHandler_ValueError(error):
    print(error)
    return Response(error_msg=error.__str__(), status=False).__dict__, 404

@bp.app_errorhandler(NotFoundError)
def errorHandler_NotFoundError(error):
    print(error)
    return Response(error_msg=error.__str__(), status=False).__dict__, 404

@bp.app_errorhandler(HTTPException)
def errorHandler_HTTPException(error):
    print(error)
    return Response(error_msg=error.__str__(), status=False).__dict__, error.code

@bp.app_errorhandler(Exception)
def errorHandler_500(error):
    print(type(error))
    print(error)
    return Response(error_msg="Oops, something went wrong!", status=False).__dict__, 500