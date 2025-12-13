import { NextFunction, Request, Response } from "express";
import RequestFormatter, {
    ErrorJsonType,
    getErrorJson,
    StatusCode,
} from "@/utils/requestFormatter";
import { serverLogger } from "@/middleware/logger";

function getErrorDebugJson(
    err: Error,
    statusCode: StatusCode
): Partial<ErrorJsonType> {
    const prod = process.env.PROD === "1";

    const errorJson = getErrorJson(err, statusCode);

    if (prod) {
        delete errorJson.stack;
    }

    return errorJson;
}
export default function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    _next: NextFunction
) {
    const statusCode = [500, 405, 404, 400, 401, 403].includes(res.statusCode)
        ? res.statusCode
        : 500;

    let json = err.message;

    err.message = json;

    res.status(statusCode).json(getErrorDebugJson(err, statusCode));

    serverLogger.error(JSON.stringify(RequestFormatter(req, res, err)));

    return;
}
