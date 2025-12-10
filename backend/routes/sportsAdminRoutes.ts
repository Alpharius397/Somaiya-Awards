import express from "express";
import {
    sportsStarGirlDataHandler,
    sportsStarBoyDataHandler,
    inspiringCoachDataHandler,
    sportsDataUpdater,
    getNominatedNames,
    getSportsBoyExcelData,
    getSportsCoachExcelData,
    getSportsGirlExcelData,
} from "../controllers/sportsAdminController";
import csrfMiddleware from "../middleware/csrfMiddleware";
import roleMiddle from "../middleware/role";
import userAuthenticator from "../middleware/userAuthenticator";
import { Role } from "../types/role";
import { ApplicationLoggerMiddleware } from "../middleware/logger";
const router = express.Router();

/**GET REQUEST */

router.route("/sports-star-girl").get(sportsStarGirlDataHandler);
router.route("/sports-star-boy").get(sportsStarBoyDataHandler);
router.route("/inspiring-coach").get(inspiringCoachDataHandler);
router.route("/nominated-coach-names").get(getNominatedNames);
router.route("/sports-excel/sports-star-boy").get(getSportsBoyExcelData);
router.route("/sports-excel/sports-star-girl").get(getSportsGirlExcelData);
router.route("/sports-excel/inspiring-coach").get(getSportsCoachExcelData);

/**
 * PUT REQUEST
 */
router
    .route("/update")
    .put(
        csrfMiddleware,
        userAuthenticator,
        roleMiddle([Role.SportsAdmin]),
        sportsDataUpdater
    );

router.use(ApplicationLoggerMiddleware);
    
export default router;
