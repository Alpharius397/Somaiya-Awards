import express from "express";
import {
    researchDataHandler,
    researchDataUpdater,
} from "../controllers/researchAdminController";
import userAuthenticator from "../middleware/userAuthenticator";
import roleMiddle from "../middleware/role";
import { Role } from "../types/role";
import csrfMiddleware from "../middleware/csrfMiddleware";
import { ApplicationLoggerMiddleware } from "../middleware/logger";

const router = express.Router();

// GET METHOD ROUTES

router.route("/research").get(researchDataHandler);

// PUT METHOD ROUTES

router
    .route("/update")
    .put(
        csrfMiddleware,
        userAuthenticator,
        roleMiddle([Role.ResearchAdmin]),
        researchDataUpdater
    );

router.use(ApplicationLoggerMiddleware);
    

export default router;
