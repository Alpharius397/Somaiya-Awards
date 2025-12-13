import asyncHandler from "@/utils/asyncHandler";
import { User } from "@/models";
import { AuthRequest } from "@/types/request";
import { getJwtToken } from "@/middleware/jwt";
import { AccessCookie } from "@/constants";

const userAuthenticator = asyncHandler(async (req, res, next) => {
    const accessToken = req.cookies[AccessCookie];

    const disable = process.env.AuthDisable === "1";

    /** Might break further user based requests */
    // if (disable) {
    //   next();
    //   return;
    // }

    if (!accessToken) {
        res.status(400).json({
            message: "Malformed Request",
        });
        return;
    }

    if (Array.isArray(accessToken)) {
        res.status(400).json({
            error: "Received Multiple Tokens",
        });
        return;
    }

    const access = getJwtToken(accessToken);

    if (access === null) {
        res.status(401).json({
            message: "Token Expired",
        });
        return;
    }

    let user = await User.findOne({
        where: { id: access.id, email_id: access.email_id },
    });

    if (user === null) {
        res.status(401).json({
            message: "User ID not found",
        });

        return;
    }

    (req as AuthRequest).user = user;
    next();
});

export default userAuthenticator;
