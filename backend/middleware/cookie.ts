import { CookieOptions, Response } from "express";
import { LoginCookie } from "@/shared/constants";
import { JwtTimeout } from "@/middleware/jwt";
import { randomString } from "@/middleware/csrfMiddleware";
import { AccessCookie, RefreshCookie } from "@/constants";

export type setCookieType = {
    timeout: JwtTimeout | "0s";
    path?: string | null;
    httpOnly?: boolean;
    domain?: string | null;
};

function setCookieOption({
    timeout,
    path = null,
    httpOnly = true,
    domain = null,
}: setCookieType): CookieOptions {
    let maxAge = 0;
    const prod = process.env.PROD === "1";

    switch (timeout) {
        case "1h":
            maxAge += 1000 * 60 * 60;
            break;
        case "1d":
            maxAge += 1000 * 60 * 60 * 24;
            break;
        case "0s":
            maxAge = 0;
            break;
        default:
            throw new Error("Invalid expiration time");
    }

    let config: CookieOptions = {
        maxAge,
        httpOnly,
        secure: prod,
        sameSite: prod ? "none" : "lax",
    };

    if (path) {
        config.path = path;
    }

    if (domain) {
        config.domain = prod ? domain : "localhost";
    }

    return config;
}

const accessCookieOption: setCookieType = { timeout: "1h" } as const;

const refreshCookieOption: setCookieType = {
    timeout: "1d",
    path: "/auth/refresh",
} as const;

const loginCookieOption: setCookieType = {
    timeout: "1h",
    httpOnly: false,
    domain: ".somaiya.edu",
} as const;

export function removeCookieOption(option: setCookieType): setCookieType {
    return { ...option, timeout: "0s" };
}

export function setCookie(
    res: Response,
    cookieName: string,
    cookieValue: string,
    option: setCookieType
) {
    res.cookie(
        encodeURIComponent(cookieName),
        encodeURIComponent(cookieValue),
        setCookieOption(option)
    );
}

export function setAccessCookie(res: Response, cookie: string) {
    setCookie(res, AccessCookie, cookie, accessCookieOption);
}

export function setRefreshCookie(res: Response, cookie: string) {
    setCookie(res, RefreshCookie, cookie, refreshCookieOption);
}

export function setLoginCookie(res: Response) {
    setCookie(res, LoginCookie, randomString(128), loginCookieOption);
}

export function removeAccessCookie(res: Response) {
    setCookie(res, AccessCookie, "", removeCookieOption(accessCookieOption));
}

export function removeRefreshCookie(res: Response) {
    setCookie(res, RefreshCookie, "", removeCookieOption(refreshCookieOption));
}

export function removeLoginCookie(res: Response) {
    setCookie(res, LoginCookie, "", removeCookieOption(loginCookieOption));
}
