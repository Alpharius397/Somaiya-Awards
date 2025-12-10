import fs from "fs/promises";
import { PathLike, constants, accessSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { destinations } from "../middleware/fileUpload";
import { DIR_NAME } from "../constants";

const MODIFY_DIR = constants.X_OK | constants.W_OK;
const MODIFY_FILE = constants.R_OK | constants.W_OK;
const FILE_EXISTS = constants.F_OK;

function wrapperSync(path: PathLike, perm: number) {
    try {
        accessSync(path, perm);
        return true;
    } catch (err) {
        return false;
    }
}

async function wrapper(path: PathLike, perm: number) {
    try {
        await fs.access(path, perm);
        return true;
    } catch (err) {
        return false;
    }
}

export async function mkdirPossible(path: PathLike) {
    return wrapper(path, MODIFY_DIR);
}

export function mkdirPossibleSync(path: PathLike) {
    return wrapperSync(path, MODIFY_DIR);
}

export function writePossible(path: PathLike) {
    const fileExists = wrapperSync(path, FILE_EXISTS);

    if (fileExists) {
        return wrapperSync(path, MODIFY_FILE);
    }

    return wrapperSync(dirname(path as string), MODIFY_DIR);
}

function checkDir(dir: string) {

    const dataDir = resolve(DIR_NAME, "data");
    const target = resolve(dir);
    for (const uploadPath of destinations) {
        if (resolve(dataDir, uploadPath) === target) {
            return true;
        }
    }

    return false;
}

export function validFileSync(path: PathLike) {
    try {
        const absPath = resolve(String(path))
        const stat = statSync(absPath);
        const dir = dirname(absPath);
        
        return stat.isFile() && checkDir(dir);

    } catch (err) {
        return false;
    }
}

export async function validFileAsync(path: PathLike) {
    try {
        const absPath = resolve(String(path))
        const stat = await fs.stat(absPath);
        const dir = dirname(absPath);

        return stat.isFile() && checkDir(dir);
    } catch (err) {
        return false;
    }
}
