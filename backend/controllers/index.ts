import { Request, Response } from "express";
import z from "zod";
import { FileRequest, FilesRequest } from "../types/request";
import fs from "fs/promises";
import { dirname, resolve } from "node:path";
import { mkdirPossible, validFileAsync } from "../utils/permChecker";
import { PathLike } from "node:fs";
import { DIR_NAME } from "../constants";

/** Checks schema against validator and throws an error if invalid schema and also set res to status 400 */
export function checkObject<T>(
    data: { [key: string]: any },
    validator: z.ZodObject,
    res: Response
): T {
    let response = validator.safeParse(data);

    if (!response.success) {
        res.status(400);
        throw new Error(JSON.stringify(z.treeifyError(response.error)));
    }

    return response.data as T;
}

export function checkFiles(req: Request, res: Response) {
    const files = (req as FilesRequest).files;

    if (!files) {
        res.status(400);
        throw new Error("Invalid File Response");
    }

    return files;
}

export function checkFile(req: Request, res: Response) {
    const file = (req as FileRequest).file;

    if (Array.isArray(file)) {
        res.status(400);
        throw new Error("Invalid File Response");
    }

    if (!file) {
        res.status(400);
        throw new Error("Invalid File Response");
    }

    return file;
}

export type CleanUpFileType =
    | { status: "null" }
    | { status: "success"; fileName: string }
    | { status: "failure"; fileName: string; error: Error };

export async function cleanUpFile(req: Request): Promise<CleanUpFileType> {
    const file = (req as FileRequest).file;

    if (!file) {
        return { status: "null" };
    }

    const fileName = resolve(DIR_NAME, file.path);
    const folderName = resolve(DIR_NAME, dirname(file.path));

    // Check for folder permission and valid file
    if ((await validFileAsync(fileName)) && (await mkdirPossible(folderName))) {
        try {
            await fs.unlink(fileName);
            return { status: "success", fileName: fileName };
        } catch (err) {
            return {
                status: "failure",
                fileName: fileName,
                error: err as Error,
            };
        }
    } else {
        return {
            status: "failure",
            fileName: fileName,
            error: new Error("Invalid Perms"),
        };
    }
}

async function deleteAsync(
    folderName: PathLike,
    fileName: PathLike
): Promise<CleanUpFileType> {
    if (
        !((await mkdirPossible(folderName)) && (await validFileAsync(fileName)))
    ) {
        return {
            status: "failure",
            fileName: fileName as string,
            error: new Error("Invalid Perms"),
        };
    }

    try {
        await fs.unlink(fileName);
        return { status: "success", fileName: fileName as string };
    } catch (err) {
        return {
            status: "failure",
            fileName: fileName as string,
            error: err as Error,
        };
    }
}

export async function cleanUpFiles(req: Request): Promise<CleanUpFileType[]> {
    const FILES = (req as FilesRequest).files;

    if (!FILES) {
        return [];
    }

    const result: Promise<CleanUpFileType>[] = [];
    Object.keys(FILES).forEach((key) => {
        const files = FILES[key];

        for (const file of files) {
            const fileName = resolve(DIR_NAME, file.path);
            const folderName = resolve(DIR_NAME, dirname(file.path));

            result.push(deleteAsync(folderName, fileName));
        }
    });

    return await Promise.all(result);
}

// export function getParamValue(
//     req: Request,
//     res: Response,
//     key: string,
//     error: string
// ) {
//     const value: string | null = req.params[key];

//     if (!value) {
//         res.status(400);
//         throw new Error(error);
//     }

//     return value;
// }
