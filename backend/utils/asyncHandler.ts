import { Request, Response, NextFunction } from "express";

type ControllerType = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void> | void;

export default function asyncHandler(fn: ControllerType) {
    return (req: Request, res: Response, next: NextFunction) => {
        const fnReturn = fn(req, res, next);
        return Promise.resolve(fnReturn).catch(next);
    };
}
