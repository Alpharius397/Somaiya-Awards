import jwt from "jsonwebtoken";
import { JwtForm, JwtType } from "@/zod/auth/jwt";
import { Model } from "sequelize";

export function getJwtToken(token: string): JwtType | null {
    try {
        const secret = process.env.JWT_SECRET;

        if (secret === undefined) throw new Error("JWT Secret not found");
        return JwtForm.parse(jwt.verify(token, secret));
    } catch (err) {
        console.error(err);
        return null;
    }
}

// This is parse by jwtLib
export type JwtTimeout = "1h" | "1d";

export function setJwtToken(user: Model, expire: JwtTimeout) {
    let payload = {
        id: user.getDataValue("id"),
        email_id: user.getDataValue("email_id"),
        role: user.getDataValue("role"),
        institution: user.getDataValue("institution"),
    };

    //@ts-ignore No Password on token
    const secret = process.env.JWT_SECRET;

    if (secret === undefined) throw new Error("JWT Secret not found");

    return jwt.sign(payload, secret, { expiresIn: expire });
}

export function randomJwt(expire: JwtTimeout) {
    //@ts-ignore No Password on token
    const secret = process.env.JWT_SECRET;

    if (secret === undefined) throw new Error("JWT Secret not found");

    return jwt.sign(
        { key: Date.now() * Math.random(), value: Date.now() * Math.random() },
        secret,
        { expiresIn: expire }
    );
}
