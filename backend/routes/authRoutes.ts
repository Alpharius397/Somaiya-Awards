import express from "express";
import {
    userLogin,
    passwordReset,
    changePassword,
    registerUser,
    bulkCreateOrUpdateUsers,
    userRefresh,
    userLogout,
} from "@/controllers/authController";
import csrfMiddleware from "@/middleware/csrfMiddleware";

const router = express.Router();

/**
 *  Routes. Note: Manual csrf cause entry points might not have them, except refresh and bulk-create
 */

router.route("/login").post(userLogin);
router.route("/logout").post(userLogout);
router.route("/refresh").post(csrfMiddleware, userRefresh);
router.route("/forgot-password").post(passwordReset);
router.route("/:id/:token").post(changePassword);
router.route("/register").post(registerUser);
router.route("/bulk-create").post(csrfMiddleware, bulkCreateOrUpdateUsers);

/**
 * Exports
 */

export default router;
