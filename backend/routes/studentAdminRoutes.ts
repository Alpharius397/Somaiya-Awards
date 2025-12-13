import express from "express";
import {
    somaiyaStarGirlDataHandler,
    somaiyaStarBoyDataHandler,
    somaiyaStarInnovatorDataHandler,
    somaiyaStarCitizenDataHandler,
    somaiyaGreenStarDataHandler,
    studentsDataUpdater,
} from "@/controllers/studentAdminController";
import csrfMiddleware from "@/middleware/csrfMiddleware";
import userAuthenticator from "@/middleware/userAuthenticator";
import roleMiddle from "@/middleware/role";
import { Role } from "@/shared/types/role";

const router = express.Router();

/**
 * GET REQUEST
 */

router.route("/somaiya-star-girl").get(somaiyaStarGirlDataHandler);
router.route("/somaiya-star-boy").get(somaiyaStarBoyDataHandler);
router.route("/somaiya-star-innovator").get(somaiyaStarInnovatorDataHandler);
router.route("/somaiya-star-citizen").get(somaiyaStarCitizenDataHandler);
router.route("/somaiya-green-star").get(somaiyaGreenStarDataHandler);

/**
 * Put REQUEST
 */

router
    .route("/update")
    .put(
        csrfMiddleware,
        userAuthenticator,
        roleMiddle([Role.StudentAdmin]),
        studentsDataUpdater
    );

export default router;
