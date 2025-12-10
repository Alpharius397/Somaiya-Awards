import express from "express";
const router = express.Router();
import { upload11 } from "../middleware/fileUpload";
import {
    getCounts,
    getDaysCount,
    getInstitutionWiseCount,
    getInstitutionData,
    getResearchData,
    getFormPreviewData,
    deleteUser,
    getTeachingJurySummaryData,
    getNonTeachingJurySummaryData,
    getTeachingData,
    getNonTeachingData,
    getFeedback01Data,
    getFeedback02Data,
    getFeedback03Data,
    getFeedback04Data,
    getTeachingScoreCardData,
    getNonTeachingScoreCardData,
    resultsDataHandler,
    getResultsData,
    getGroupWiseCount,
    getStudentsData,
    getSportsGirlData,
    getSportsBoyData,
    getSportsCoachData,
    getUsersData,
    getInspiringCoachScorecard,
} from "../controllers/adminController";
import userAuthenticator from "../middleware/userAuthenticator";
import { Role } from "../types/role";
import roleMiddle from "../middleware/role";
import csrfMiddleware from "../middleware/csrfMiddleware";
import { AuthLoggerMiddleware } from "../middleware/logger";

/** GET ROUTES */

router
    .route("/count/all")
    .get(userAuthenticator, roleMiddle([Role.Admin]), getCounts);
router
    .route("/count/15")
    .get(userAuthenticator, roleMiddle([Role.Admin]), getDaysCount);
router
    .route("/count/institution-wise")
    .get(userAuthenticator, roleMiddle([Role.Admin]), getInstitutionWiseCount);
router
    .route("/count/group")
    .get(userAuthenticator, roleMiddle([Role.Admin]), getGroupWiseCount);
router
    .route("/users")
    .get(userAuthenticator, roleMiddle([Role.Admin]), getUsersData);

// responses

router
    .route("/forms/outstanding-institution")
    .get(userAuthenticator, roleMiddle([Role.Admin]), getInstitutionData);
router
    .route("/forms/research")
    .get(userAuthenticator, roleMiddle([Role.Admin]), getResearchData);
router
    .route("/forms/sports-girl")
    .get(userAuthenticator, roleMiddle([Role.Admin]), getSportsGirlData);
router
    .route("/forms/sports-boy")
    .get(userAuthenticator, roleMiddle([Role.Admin]), getSportsBoyData);
router
    .route("/forms/sports-coach")
    .get(userAuthenticator, roleMiddle([Role.Admin]), getSportsCoachData);
router
    .route("/forms/students")
    .get(userAuthenticator, roleMiddle([Role.Admin]), getStudentsData);
router
    .route("/forms/teaching")
    .get(userAuthenticator, roleMiddle([Role.Admin]), getTeachingData);
router
    .route("/forms/non-teaching")
    .get(userAuthenticator, roleMiddle([Role.Admin]), getNonTeachingData);
router
    .route("/forms/feedback-01")
    .get(userAuthenticator, roleMiddle([Role.Admin]), getFeedback01Data);
router
    .route("/forms/feedback-02")
    .get(userAuthenticator, roleMiddle([Role.Admin]), getFeedback02Data);
router
    .route("/forms/feedback-03")
    .get(userAuthenticator, roleMiddle([Role.Admin]), getFeedback03Data);
router
    .route("/forms/feedback-04")
    .get(userAuthenticator, roleMiddle([Role.Admin]), getFeedback04Data);

// scorecard

router
    .route("/teaching/scorecard")
    .get(userAuthenticator, roleMiddle([Role.Admin]), getTeachingScoreCardData);
router
    .route("/non-teaching/scorecard")
    .get(
        userAuthenticator,
        roleMiddle([Role.Admin]),
        getNonTeachingScoreCardData
    );

router
    .route("/sports-coach/scorecard")
    .get(
        userAuthenticator,
        roleMiddle([Role.Admin, Role.SportsAdmin]),
        getInspiringCoachScorecard
    );

router
    .route("/:formtype/preview")
    .get(userAuthenticator, roleMiddle([Role.Admin]), getFormPreviewData);

// Announce Results

router
    .route("/announce-results")
    .post(
        csrfMiddleware,
        userAuthenticator,
        roleMiddle([Role.Admin]),
        upload11.single("result"),
        resultsDataHandler
    );

// GET RESULTS

router.route("/results").get(getResultsData);

// Jury summary

router
    .route("/jury-summary/teaching")
    .get(
        userAuthenticator,
        roleMiddle([Role.Admin]),
        getTeachingJurySummaryData
    );
router
    .route("/jury-summary/non-teaching")
    .get(
        userAuthenticator,
        roleMiddle([Role.Admin]),
        getNonTeachingJurySummaryData
    );

// delete query
router
    .route("/delete-user")
    .delete(
        csrfMiddleware,
        userAuthenticator,
        roleMiddle([Role.Admin]),
        deleteUser
    );

router.use(AuthLoggerMiddleware);
    
export default router;
