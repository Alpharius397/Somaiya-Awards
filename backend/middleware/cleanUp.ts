import { Request, Response, NextFunction } from "express";
import { cleanUpFile, cleanUpFiles, CleanUpFileType } from "@/controllers";
import { FileRequest, FilesRequest } from "@/types/request";
import { serverLogger } from "@/middleware/logger";

type CleanJson = {
    FilesRemoved: string[];
    FilesNotRemoved: { name: string; error: Error }[];
};

async function cleanUpJson(req: Request) {
    const fileRequest = (req as FileRequest).file;

    const filesRequest = (req as FilesRequest).files;

    const cleanUp: CleanUpFileType[] = [];

    if (fileRequest) {
        cleanUp.push(await cleanUpFile(req));
    }
    if (filesRequest) {
        cleanUp.push(...(await cleanUpFiles(req)));
    }

    const cleanJson: CleanJson = { FilesRemoved: [], FilesNotRemoved: [] };

    for (const file of cleanUp) {
        const { status } = file;

        switch (status) {
            case "success":
                cleanJson.FilesRemoved.push(file.fileName);
                break;
            case "failure":
                cleanJson.FilesNotRemoved.push({
                    name: file.fileName,
                    error: file.error,
                });
                break;
        }
    }

    return cleanJson;
}

export default function cleanUpMiddleware(
    err: Error,
    req: Request,
    _res: Response,
    next: NextFunction
) {
    cleanUpJson(req).then((val) => {
        serverLogger.debug(JSON.stringify(val));
    });
    next(err);
}
