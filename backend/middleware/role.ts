import asyncHandler from "@/utils/asyncHandler";
import { AuthRequest } from "@/types/request";
import { Role } from "@/shared/types/role";

/** Thanks ieac */
export default function roleMiddle(roles: Role[]) {
    return asyncHandler(async (req, res, next) => {
        const user = (req as AuthRequest).user;

        if (!user) {
            res.status(401);
            throw new Error("User not found");
        }

        if (!roles.includes(user.role)) {
            res.status(403);
            throw new Error("Forbidden Access");
        }
        next();
    });
}
