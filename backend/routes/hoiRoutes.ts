import express from "express";
const router = express.Router();
import {
    institutionDataHandler,
    researchDataHandler,
    sportsDataHandler,
    teachingDataHandler,
    nonTeachingDataHandler,
    studentsDataHandler,
} from "../controllers/hoiController";

// all hoi accessible routes;

//get institution form data

router.route("/outstanding-institution").get(institutionDataHandler);

//get research form data

router.route("/research").get(researchDataHandler);

//get sports form data

router.route("/sports").get(sportsDataHandler);

//get teaching form data

router.route("/teaching").get(teachingDataHandler);

//get non-teaching form data

router.route("/non-teaching").get(nonTeachingDataHandler);

//get non-teaching form data

router.route("/students").get(studentsDataHandler);

export default router;
