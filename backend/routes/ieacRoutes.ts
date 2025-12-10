import express from "express";
const router = express.Router();
import {
    teachingDataUpdater,
    nonTeachingDataUpdater,
    teachingRecFileHandler,
    nonTeachingRecFileHandler,
    getNominatedTeacherNames,
    getNominatedStaffNames,
    teachingDataHandler,
    nonTeachingDataHandler,
    institutionDataHandler,
} from "../controllers/ieacController";
import { upload08, upload09 } from "../middleware/fileUpload";
import userAuthenticator from "../middleware/userAuthenticator";
import csrfMiddleware from "../middleware/csrfMiddleware";
import roleMiddle from "../middleware/role";
import { Role } from "../types/role";
import { ApplicationLoggerMiddleware } from "../middleware/logger";

/**GET Routes */
router.route("/outstanding-institution").get(institutionDataHandler);
router.route("/teaching").get(teachingDataHandler);
router.route("/non-teaching").get(nonTeachingDataHandler);

router.route("/nominated-faculty-names").get(getNominatedTeacherNames);
router.route("/nominated-staff-names").get(getNominatedStaffNames);

/**PUT Routes */

router
    .route("/teaching")
    .put(
        csrfMiddleware,
        userAuthenticator,
        roleMiddle([Role.Ieac]),
        teachingDataUpdater
    );
router
    .route("/non-teaching")
    .put(
        csrfMiddleware,
        userAuthenticator,
        roleMiddle([Role.Ieac]),
        nonTeachingDataUpdater
    );

/**POST Routes */

router
    .route("/teaching")
    .post(
        csrfMiddleware,
        userAuthenticator,
        roleMiddle([Role.Ieac]),
        upload08.single("approvalFile"),
        teachingRecFileHandler
    );
router
    .route("/non-teaching")
    .post(
        csrfMiddleware,
        userAuthenticator,
        roleMiddle([Role.Ieac]),
        upload09.single("approvalFile"),
        nonTeachingRecFileHandler
    );

router.use(ApplicationLoggerMiddleware);


export default router;
