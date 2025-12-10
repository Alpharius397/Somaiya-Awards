import { Request, Response } from "express";
import { applicationHeader, CsrfName, instituteHeader } from "../constants";
import { User } from "../models/tables/User";
import { AuthRequest } from "../types/request";
import { JSONCookie } from "cookie-parser";

const ALLOWED_HEADERS = [CsrfName, instituteHeader, applicationHeader] as const;

type AllowedHeaders = { [key in (typeof ALLOWED_HEADERS)[number]]: string };

type FileObject = {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
};

type HeaderObject = {
    cookie?: { [key: string]: string };
} & Partial<AllowedHeaders>;

export type AllowedMethods =
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "PATCH"
    | "OPTIONS";

type RequestObj = {
    IP: string;
    USER: Partial<User> | { user: "Unknown" };
    URL: string;
    METHOD: AllowedMethods;
    HEADERS: HeaderObject;
    FILES?: FileObject[];
    BODY: { [key: string]: string };
    STATUS: number;
    ERROR?: Required<ErrorJsonType>;
};

export enum StatusCode {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
}

export type ErrorJsonType = { title: string; message: string; stack: string };

export function getErrorJson(
    err: Error,
    statusCode: StatusCode
): ErrorJsonType {
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

    let jsonMsg = err.message;

    try {
        jsonMsg = JSON.parse(err.message);
    } catch (err) {}

    const errorJson: ErrorJsonType = {
        title: getTitle(statusCode),
        message: jsonMsg,
        stack: err.stack,
    };

    return errorJson;
}

export function extractCookies(cookieString: string) {
    const _cookies = cookieString.split(";").map((str) => str.trim());

    const cookie: { [key: string]: string } = {};

    for (const key_value of _cookies) {
        const index = key_value.indexOf("=");

        if (index !== -1) {
            const key = key_value.slice(0, index);
            const value = key_value.slice(index + 1);

            cookie[key] = value;
        }
    }

    return cookie;
}

export default function RequestFormatter(
    req: Request,
    res: Response,
    err?: Error
): RequestObj {
    const { ip, baseUrl, url, file, files, headers } = req;

    const reqObj: RequestObj = {
        IP: ip,
        URL: baseUrl + url,
        METHOD: req.method as AllowedMethods,
        HEADERS: {},
        FILES: [],
        BODY: req.body,
        STATUS: res.statusCode,
        USER: { user: "Unknown" },
    };

    ALLOWED_HEADERS.map((val) => {
        if (headers[val]) {
            reqObj.HEADERS[val] = headers[val].toString();
        }
    });

    if (headers.cookie) {
        reqObj.HEADERS.cookie = extractCookies(headers.cookie);
    }

    if (file) {
        reqObj.FILES.push(file);
    }

    if (files) {
        Object.values(files).forEach((val) => reqObj.FILES.push(val));
    }

    if (err) {
        reqObj.ERROR = getErrorJson(err, res.statusCode);
    }

    if ((req as AuthRequest).user) {
        const { id, email_id, institution, role, createdAt, updatedAt } = (
            req as AuthRequest
        ).user;

        reqObj.USER = { id, email_id, institution, role, createdAt, updatedAt };
    }

    return reqObj;
}
