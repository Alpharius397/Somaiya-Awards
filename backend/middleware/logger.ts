import winston from "winston";

const dashLine = Array.from({ length: 100 })
    .map(() => "-")
    .join("");

function logFormatter(label: string) {
    return winston.format.combine(
        winston.format.timestamp({
            format: "DD-MM-YYYY HH:mm:ss",
        }),
        winston.format.printf(
            (info) =>
                `${dashLine}\n[${info.timestamp}]:[${label}]:[${info.level.toUpperCase()}]: ${info.message}\n${dashLine}`
        )
    );
}


export const serverLogger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: "logs/server.log",
        }),
    ],
    format: logFormatter("SERVER"),
});

export const authLogger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: "logs/auth.log",
            
        }),
    ],
    format: logFormatter("AUTH"),
});

export const formLogger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: "logs/applications.log",
        }),
    ],
    format: logFormatter("FORM"),
});
