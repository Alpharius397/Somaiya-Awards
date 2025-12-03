import { Request, Response, NextFunction } from "express";

enum StatusCode {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
}

type ErrorJsonType = { title: string; message: string; stack?: string }

function getErrorJson(
    err: Error,
    statusCode: StatusCode
): ErrorJsonType {
    const debug = !(process.env.PROD === "1");

    const getTitle = (statusCode: StatusCode) => {
        switch (statusCode) {
            case StatusCode.BAD_REQUEST:
                return "400 : BAD REQUEST";

            case StatusCode.UNAUTHORIZED:
                return "401 : UNAUTHORIZED";

            case StatusCode.FORBIDDEN:
                return "403 : FORBIDDEN";

            case StatusCode.NOT_FOUND:
                return "404 : NOT FOUND";

            case StatusCode.METHOD_NOT_ALLOWED:
                return "405 : METHOD NOT ALLOWED";

            default:
                return "500 : Server Error";
        }
    };

    const errorJson: ErrorJsonType ={
            title: getTitle(statusCode),
            message: err.message,
    };
    
    if (debug) {
        errorJson.stack = err.stack;
    }

    return errorJson
}
export default function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const statusCode = [500, 405, 404, 400, 401, 403].includes(res.statusCode)
        ? res.statusCode
        : 500;

    let json = err.message;

    try {
        json = JSON.parse(json);
    } catch (e) {}

    err.message = json;

    res

    res.status(statusCode).json(getErrorJson(err, statusCode));
    return;
}
