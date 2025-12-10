import winston from "winston";
import asyncHandler from "express-async-handler";
import RequestFormatter, { AllowedMethods } from "../utils/requestFormatter";

const dashLine = Array.from({ length: 100 })
    .map(() => "-")
    .join("");

function logFormatter(label: string) {
    return winston.format.combine(
        winston.format.timestamp({
            format: "DD-MM-YYYY HH:mm:ss",
        }),
        winston.format.printf(
            /** Weird format cause prettier */
            (info) =>
                `\n${dashLine}\n` +
                `[${info.timestamp}]:` +
                `[${label}]:[${info.level.toUpperCase()}]:` +
                `${info.message}` +
                `\n${dashLine}`
        )
    );
}

export const serverLogger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: "logs/server.log",
        }),
        new winston.transports.Console(),
    ],
    format: logFormatter("SERVER"),
    level: "debug",
});

const authLogger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: "logs/auth.log",
        }),
        new winston.transports.Console(),
    ],
    format: logFormatter("AUTH"),
});

const applicationLogger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: "logs/applications.log",
        }),
        new winston.transports.Console(),
    ],
    format: logFormatter("APPLICATION"),
});

const METHOD_TO_LOG: AllowedMethods[] = ["DELETE", "PUT", "POST"];

function LoggerMiddleware(logger: winston.Logger) {
    logger.transports;
    return asyncHandler((req, res, next) => {
        if (METHOD_TO_LOG.includes(req.method as AllowedMethods))
            logger.info(JSON.stringify(RequestFormatter(req, res)));
        next();
    });
}

export const ApplicationLoggerMiddleware = LoggerMiddleware(applicationLogger);
export const AuthLoggerMiddleware = LoggerMiddleware(authLogger);
export const ServerLoggerMiddleware = LoggerMiddleware(serverLogger);
