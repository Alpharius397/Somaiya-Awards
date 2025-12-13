import { Request, Response } from "express";
import { FileRequest } from "@/types/request";
import asyncHandler from "@/utils/asyncHandler";
import type {
    countAll,
    TeachingJuryScore,
    lastDate,
    InstituteCount,
    groupCountType,
    lastDay,
    NonTeachingJuryScore,
    instituteCountType,
    instituteCountArrayType,
    getInstitutionType,
    MyModel,
    SportsGirlType,
    CoachType,
    SportsBoyType,
} from "@/types/controllers/admin";
import {
    User,
    FeedbackOne,
    FeedbackTwo,
    FeedbackThree,
    FeedbackFour,
    NonTeaching,
    OutstandingInstitution,
    Research,
    Results,
    Sports,
    Students,
    Teaching,
    sequelize,
    FeedbackFive,
} from "@/models";
import { Op } from "sequelize";
import {
    applicationHeader,
    awards,
    Group,
    Groups,
    Institutes,
    NonTeachingAward,
} from "@/shared/constants";
import { AuthLogger } from "@/middleware/logger";
import { type NonTeachingJuryData } from "@/shared/types/controllers/admin";

function textToScore(text: string) {
    switch (text) {
        case "Strongly Agree":
        case "Outstanding":
            return 5;

        case "Agree":
        case "Excellent":
        case "Very Good":
            return 4;

        case "Sometimes":
        case "Good":
            return 3;

        case "Disagree":
        case "Average":
            return 2;

        case "Poor":
        case "Strongly Disagree":
            return 1;
        default:
            return 0;
    }
}

const LogRequest = AuthLogger;

/**
 * @desc Get count of all forms
 * @route /admin/data/count/all
 * @method GET
 * @access Private
 */
export const getCounts = asyncHandler(async (_req: Request, res: Response) => {
    const conditions = {
        where: sequelize.where(
            sequelize.fn("YEAR", sequelize.col("createdAt")),
            new Date().getFullYear()
        ),
    };

    let countData: countAll = {
        /** WARN: Explicitly Fail if something errors out */

        // institution Count
        institutionFormCount: await OutstandingInstitution.count(conditions),

        // research Count

        researchFormCount: await Research.count(conditions),

        // sports Count

        sportsFormCount: await Sports.count(conditions),

        // teaching Count

        teachingFormCount: await Teaching.count(conditions),

        // non teaching Count

        nonTeachingFormCount: await NonTeaching.count(conditions),

        // feedback1 count

        feedbackOneFormCount: await FeedbackOne.count(conditions),

        // feedback2 count

        feedbackTwoFormCount: await FeedbackTwo.count(conditions),

        // feedback3 count

        feedbackThreeFormCount: await FeedbackThree.count(conditions),

        // feedback4 count

        feedbackFourFormCount: await FeedbackFour.count(conditions),

        // students form count

        studentsFormCount: await Students.count(conditions),
    };

    res.status(200).json({ data: countData });
});

/**
 * Returns the date, `days` days ago.
 * Eg: days = 15, returns the date 15 days ago
 */
function getLastDate(days: number) {
    let currentYear = new Date().getFullYear(),
        currentMonth = new Date().getMonth(),
        currentDate = new Date().getDay() - days;

    if (currentDate < 1) {
        currentMonth--; // year changes accordingly, but not date
    }

    return new Date(currentYear, currentMonth, currentDate);
}

/**
 * NOTE: raw: false, gives the class back. To access any new aggregation field use the dataValues field
 * */
function sequelLastDays(date: Date) {
    return {
        where: sequelize.where(
            sequelize.fn("DATE", sequelize.col("createdAt")),
            {
                [Op.gte]: date.toISOString().split("T")[0],
            }
        ),
        attributes: [
            [sequelize.fn("DATE", sequelize.col("createdAt")), "date"] as const,
            [
                sequelize.fn("COUNT", sequelize.col("id")),
                "formsFilled",
            ] as const,
        ],
        group: [sequelize.fn("DATE", sequelize.col("createdAt"))],
        raw: true,
    };
}

/**
 * @desc Get form count from last 15 days
 * @route /admin/data/count/15
 * @method GET
 * @access Private
 */
export const getDaysCount = asyncHandler(
    // Ignore warnings. Raw: true -> gives json instead of class
    async (_req: Request, res: Response) => {
        //get institution data

        let conditions = sequelLastDays(getLastDate(15));

        const institutionData = (await OutstandingInstitution.findAll(
            conditions
        )) as unknown as lastDate[];

        //get research data

        const researchData = (await Research.findAll(
            conditions
        )) as unknown as lastDate[];

        //get sports data

        const sportsData = (await Sports.findAll(
            conditions
        )) as unknown as lastDate[];

        //get teaching data

        const teachingData = (await Teaching.findAll(
            conditions
        )) as unknown as lastDate[];

        //get Non Teaching Data

        const nonTeachingData = (await NonTeaching.findAll(
            conditions
        )) as unknown as lastDate[];

        // get feedback One Data

        const feedbackOneData = (await FeedbackOne.findAll(
            conditions
        )) as unknown as lastDate[];

        // get feedback two data

        const feedbackTwoData = (await FeedbackTwo.findAll(
            conditions
        )) as unknown as lastDate[];

        // get feedback three data

        const feedbackThreeData = (await FeedbackThree.findAll(
            conditions
        )) as unknown as lastDate[];

        // get feedback four data

        const feedbackFourData = (await FeedbackFour.findAll(
            conditions
        )) as unknown as lastDate[];

        // get students form data

        const studentsData = (await Students.findAll(
            conditions
        )) as unknown as lastDate[];

        //process th data to extract just dates

        let lists = [
            ...institutionData,
            ...researchData,
            ...sportsData,
            ...teachingData,
            ...nonTeachingData,
            ...feedbackOneData,
            ...feedbackTwoData,
            ...feedbackThreeData,
            ...feedbackFourData,
            ...studentsData,
        ];

        let data: lastDay = {};

        for (let list of lists) {
            if (!data.hasOwnProperty(list.date)) {
                data[list.date] = 0;
            }

            data[list.date] += list.formsFilled;
        }

        res.status(200).json({ data: data });
    }
);

function sequelInstitute() {
    return {
        where: sequelize.where(
            sequelize.fn("YEAR", sequelize.col("createdAt")),
            {
                [Op.eq]: new Date().getFullYear(),
            }
        ),
        attributes: [
            "institution_name",
            [
                sequelize.fn("COUNT", sequelize.col("id")),
                "formsFilled",
            ] as const,
        ],
        group: ["institution_name"],
        raw: true,
    };
}

/**
 * @desc Get institution wise all forms count
 * @route /admin/data/count/institution-wise
 * @method GET
 * @access Private
 */
export const getInstitutionWiseCount = asyncHandler(
    async (_req: Request, res: Response) => {
        let conditions = sequelInstitute();

        const institutionData = (await OutstandingInstitution.findAll(
            conditions
        )) as unknown as InstituteCount[];

        //get research data

        const researchData = (await Research.findAll(
            conditions
        )) as unknown as InstituteCount[];

        //get sports data

        const sportsData = (await Sports.findAll(
            conditions
        )) as unknown as InstituteCount[];

        //get teaching data

        const teachingData = (await Teaching.findAll(
            conditions
        )) as unknown as InstituteCount[];

        //get Non Teaching Data

        //@ts-ignore
        const nonTeachingData = (await NonTeaching.findAll(
            conditions
        )) as unknown as InstituteCount[];

        // get feedback One Data

        const studentsData = (await Students.findAll(
            conditions
        )) as unknown as InstituteCount[];

        //process th data to extract just dates

        let countObject: instituteCountType = {};

        for (const i of Institutes) {
            countObject[i] = {
                institution_form: 0,
                institution_name: i,
                research_form: 0,
                sports_form: 0,
                teaching_form: 0,
                non_teaching_form: 0,
                students_form: 0,
            };
        }

        for (const data of institutionData) {
            const institute = data.institution_name;

            if (!countObject.hasOwnProperty(institute)) continue;
            countObject[institute].institution_form += data.formsFilled;
        }

        // research form Counter

        for (const data of researchData) {
            const institute = data.institution_name;

            if (!countObject.hasOwnProperty(institute)) continue;
            countObject[institute].research_form += data.formsFilled;
        }
        // sports form Counter

        for (const data of sportsData) {
            const institute = data.institution_name;

            if (!countObject.hasOwnProperty(institute)) continue;
            countObject[institute].sports_form += data.formsFilled;
        }

        // teaching form Counter

        for (const data of teachingData) {
            const institute = data.institution_name;

            if (!countObject.hasOwnProperty(institute)) continue;
            countObject[institute].teaching_form += data.formsFilled;
        }

        // non teaching form Counter

        for (const data of nonTeachingData) {
            const institute = data.institution_name;

            if (!countObject.hasOwnProperty(institute)) continue;
            countObject[institute].non_teaching_form += data.formsFilled;
        }

        // students form counter

        for (const data of studentsData) {
            const institute = data.institution_name;

            if (!countObject.hasOwnProperty(institute)) continue;
            countObject[institute].students_form += data.formsFilled;
        }
        let array: instituteCountArrayType = { data: [] };

        Object.keys(countObject).forEach((key) => {
            array.data.push(countObject[key]);
        });

        res.status(200).json(array);
    }
);

function groupCountMethod(
    groupCount: {
        group: "A" | "B" | "C" | "D" | "E";
        formsFilled: number;
    }[],
    groupIndex: number,
    count: number
) {
    groupCount[groupIndex].formsFilled += count;
}

/**
 * @desc Get form count group-wise
 * @route /admin/data/count/group
 * @method GET
 * @access Private
 */
export const getGroupWiseCount = asyncHandler(async (_req: Request, res: Response) => {
    let conditions = sequelInstitute();

    const institutionData = (await OutstandingInstitution.findAll(
        conditions
    )) as unknown as InstituteCount[];

    //get research data

    const researchData = (await Research.findAll(
        conditions
    )) as unknown as InstituteCount[];

    //get sports data

    const sportsData = (await Sports.findAll(
        conditions
    )) as unknown as InstituteCount[];

    //get teaching data

    const teachingData = (await Teaching.findAll(
        conditions
    )) as unknown as InstituteCount[];

    //get Non Teaching Data

    const nonTeachingData = (await NonTeaching.findAll(
        conditions
    )) as unknown as InstituteCount[];

    // get feedback One Data

    const studentsData = (await Students.findAll(
        conditions
    )) as unknown as InstituteCount[];

    // get feedback One Data

    //group count logic

    const groupCount: groupCountType = {
        data: [
            {
                group: "A",
                formsFilled: 0,
            },
            {
                group: "B",
                formsFilled: 0,
            },
            {
                group: "C",
                formsFilled: 0,
            },
            {
                group: "D",
                formsFilled: 0,
            },
            {
                group: "E",
                formsFilled: 0,
            },
        ],
    };

    // institute forms

    for (const response of institutionData) {
        const validGroups: Group = Groups[response.institution_name] || [];

        for (let group of validGroups) {
            groupCountMethod(groupCount.data, group, response.formsFilled);
        }
    }

    //sports

    for (const response of sportsData) {
        const validGroups: Group = Groups[response.institution_name] || [];

        for (let group of validGroups) {
            groupCountMethod(groupCount.data, group, response.formsFilled);
        }
    }

    //research

    for (const response of researchData) {
        const validGroups: Group = Groups[response.institution_name] || [];

        for (let group of validGroups) {
            groupCountMethod(groupCount.data, group, response.formsFilled);
        }
    }

    //teaching

    for (const response of teachingData) {
        const validGroups: Group = Groups[response.institution_name] || [];

        for (let group of validGroups) {
            groupCountMethod(groupCount.data, group, response.formsFilled);
        }
    }

    //non teaching

    for (const response of nonTeachingData) {
        const validGroups: Group = Groups[response.institution_name] || [];

        for (let group of validGroups) {
            groupCountMethod(groupCount.data, group, response.formsFilled);
        }
    }

    // students

    for (const response of studentsData) {
        const validGroups: Group = Groups[response.institution_name] || [];

        for (let group of validGroups) {
            groupCountMethod(groupCount.data, group, response.formsFilled);
        }
    }

    res.status(200).json(groupCount);
});

/**
 * RESPONSES SECTION
 */

/**
 * @desc Get records of institution form of current year
 * @route /admin/data/forms/outstanding-institution
 * @method GET
 * @access Private
 */
export const getInstitutionData = asyncHandler(
    async (_req: Request, res: Response) => {
        const currentYear = new Date().getFullYear();

        const data = await OutstandingInstitution.findAll({
            where: sequelize.where(
                sequelize.fn("YEAR", sequelize.col("createdAt")),
                currentYear
            ),
        });

        let instituteData: getInstitutionType = {
            data: data,
        };

        res.status(200).json(instituteData);
    }
);

/**
 * @desc Get records of IEAC aprroved research form of current year
 * @route /admin/data/forms/research
 * @method GET
 * @access Private
 */
export const getResearchData = asyncHandler(async (_req: Request, res: Response) => {
    const currentYear = new Date().getFullYear();

    const data = await Research.findAll({
        where: {
            [Op.and]: [
                sequelize.where(
                    sequelize.fn("YEAR", sequelize.col("createdAt")),
                    currentYear
                ),
                { approved: true },
            ],
        },
    });

    res.status(200).json({
        data: data,
    });
});

/**
 * @desc Get records of sports admin aprroved Sports Girl form of current year
 * @route /admin/data/forms/sports-girl
 * @method GET
 * @access
 */
export const getSportsGirlData = asyncHandler(async (_req: Request, res: Response) => {
    const currentYear = new Date().getFullYear();

    const rawData = await Sports.findAll({
        where: {
            [Op.and]: [
                sequelize.where(
                    sequelize.fn("YEAR", sequelize.col("createdAt")),
                    currentYear
                ),
                { isApprovedSportsGirl: true },
            ],
        },
    });

    const data: SportsGirlType = {
        data: [],
    };

    for (const response of rawData) {
        const object = {
            id: response.id,
            email_id: response.email_id,
            institution_name: response.institution_name,
            nominee_ss_girl: response.nominee_ss_girl,
            nominee_ss_girl_sport: response.nominee_ss_girl_sport,
            nominee_ss_girl_photo: response.nominee_ss_girl_photo,
            nominee_ss_girl_supportings: response.nominee_ss_girl_supportings,
            isApprovedSportsGirl: response.isApprovedSportsGirl,
            q_21: response.q_21,
            q_22: response.q_22,
            q_23: response.q_23,
            q_24: response.q_24,
            final_score:
                response.q_21 * 0.4 +
                response.q_23 * 0.3 +
                response.q_23 * 0.2 +
                response.q_24 * 0.1,
        };

        data.data.push(object);
    }

    res.status(200).json(data);
});

/**
 * @desc Get records of sports admin approved Sports Boy form of current year
 * @route /admin/data/forms/sports-boy
 * @method GET
 * @access Private
 */
export const getSportsBoyData = asyncHandler(async (_req: Request, res: Response) => {
    const currentYear = new Date().getFullYear();

    const rawData = await Sports.findAll({
        where: {
            [Op.and]: [
                sequelize.where(
                    sequelize.fn("YEAR", sequelize.col("createdAt")),
                    currentYear
                ),
                { isApprovedSportsBoy: true },
            ],
        },
    });

    const data: SportsBoyType = { data: [] };

    for (const response of rawData) {
        const object = {
            id: response.id,
            email_id: response.email_id,
            institution_name: response.institution_name,
            nominee_ss_boy: response.nominee_ss_boy,
            nominee_ss_boy_sport: response.nominee_ss_boy_sport,
            nominee_ss_boy_photo: response.nominee_ss_boy_photo,
            nominee_ss_boy_supportings: response.nominee_ss_boy_supportings,
            isApprovedSportsBoy: response.isApprovedSportsBoy,
            q_25: response.q_25,
            q_26: response.q_26,
            q_27: response.q_27,
            q_28: response.q_28,
            final_score:
                response.q_25 * 0.4 +
                response.q_26 * 0.3 +
                response.q_27 * 0.2 +
                response.q_28 * 0.1,
        };

        data.data.push(object);
    }

    res.status(200).json(data);
});

/**
 * @desc Get records of sports admin approved Sports Coach form of current year
 * @route /admin/data/forms/sports-coach
 * @method GET
 * @access Private
 */
export const getSportsCoachData = asyncHandler(
    async (_req: Request, res: Response) => {
        const currentYear = new Date().getFullYear();

        const rawData = await Sports.findAll({
            where: {
                [Op.and]: [
                    sequelize.where(
                        sequelize.fn("YEAR", sequelize.col("createdAt")),
                        currentYear
                    ),
                    { isApprovedCoach: true },
                ],
            },
        });

        const data: CoachType = { data: [] };

        for (const response of rawData) {
            const object = {
                id: response.id,
                email_id: response.email_id,
                institution_name: response.institution_name,
                nominee_inspiring_coach: response.nominee_inspiring_coach,
                nominee_coach_comments: response.nominee_coach_comments,
                nominee_coach_photo: response.nominee_coach_photo,
                nominee_coach_supportings: response.nominee_coach_supportings,
                isApprovedCoach: response.isApprovedCoach,
                q_01: response.q_01,
                q_02: response.q_02,
                q_03: response.q_03,
                q_04: response.q_04,
                q_05: response.q_05,
                q_06: response.q_06,
                q_07: response.q_07,
                q_08: response.q_08,
                q_09: response.q_09,
                q_10: response.q_10,
                q_11: response.q_11,
                q_12: response.q_12,
                q_13: response.q_13,
                q_14: response.q_14,
                q_15: response.q_15,
                q_16: response.q_16,
                q_17: response.q_17,
                q_18: response.q_18,
                q_19: response.q_19,
                q_20: response.q_20,
                final_score:
                    response.q_01 +
                    response.q_02 +
                    response.q_03 +
                    response.q_04 +
                    response.q_05 +
                    response.q_06 +
                    response.q_07 +
                    response.q_08 +
                    response.q_09 +
                    response.q_10 +
                    response.q_11 +
                    response.q_12 +
                    response.q_13 +
                    response.q_14 +
                    response.q_15 +
                    response.q_16 +
                    response.q_17 +
                    response.q_18 +
                    response.q_19 +
                    response.q_20,
            };

            data.data.push(object);
        }

        res.status(200).json(data);
    }
);

/**
 * @desc get records of students admin approved form of current year
 * @route /admin/data/forms/students
 * @method GET
 * @access Private
 */
export const getStudentsData = asyncHandler(async (_req: Request, res: Response) => {
    const currentYear = new Date().getFullYear();

    const data = await Students.findAll({
        where: {
            [Op.and]: [
                sequelize.where(
                    sequelize.fn("YEAR", sequelize.col("createdAt")),
                    currentYear
                ),
            ],
        },
    });

    res.status(200).json({
        data: data,
    });
});

/**
 * @desc Get records of IEAC approved Teaching form of current year
 * @route /admin/data/forms/teaching
 * @method GET
 * @access Private
 */
export const getTeachingData = asyncHandler(async (_req: Request, res: Response) => {
    const currentYear = new Date().getFullYear();

    const data = await Teaching.findAll({
        where: {
            [Op.and]: [
                sequelize.where(
                    sequelize.fn("YEAR", sequelize.col("createdAt")),
                    currentYear
                ),
                { ieacApproved: true },
            ],
        },
    });

    res.status(200).json({
        data: data,
    });
});

/**
 * @desc Get records of IEAC approved NonTeaching form of current year
 * @route /admin/data/non-teaching
 * @method GET
 * @access Private
 */
export const getNonTeachingData = asyncHandler(
    async (_req: Request, res: Response) => {
        const currentYear = new Date().getFullYear();

        const data = await NonTeaching.findAll({
            where: {
                [Op.and]: [
                    sequelize.where(
                        sequelize.fn("YEAR", sequelize.col("createdAt")),
                        currentYear
                    ),
                    { ieacApproved: true },
                ],
            },
        });

        res.status(200).json({
            data: data,
        });
    }
);

/**
 * @desc Get records of feedback-01 form of current uear
 * @route /admin/data/forms/feedback-01
 * @method GET
 * @access Private
 */
export const getFeedback01Data = asyncHandler(async (_req: Request, res: Response) => {
    const currentYear = new Date().getFullYear();

    const data = await FeedbackOne.findAll({
        where: sequelize.where(
            sequelize.fn("YEAR", sequelize.col("createdAt")),
            currentYear
        ),
    });

    res.status(200).json({
        data: data,
    });
});

/**
 * @desc Get records of feedback-02 form of current uear
 * @route /admin/data/forms/feedback-02
 * @method GET
 * @access Private
 */
export const getFeedback02Data = asyncHandler(async (_req: Request, res: Response) => {
    const currentYear = new Date().getFullYear();

    const data = await FeedbackTwo.findAll({
        where: sequelize.where(
            sequelize.fn("YEAR", sequelize.col("createdAt")),
            currentYear
        ),
    });

    res.status(200).json({
        data: data,
    });
});

/**
 * @desc Get records of feedback-03 form of current uear
 * @route /admin/data/forms/feedback-03
 * @method GET
 * @access Private
 */
export const getFeedback03Data = asyncHandler(async (_req: Request, res: Response) => {
    const currentYear = new Date().getFullYear();

    const data = await FeedbackThree.findAll({
        where: sequelize.where(
            sequelize.fn("YEAR", sequelize.col("createdAt")),
            currentYear
        ),
    });

    res.status(200).json({
        data: data,
    });
});

/**
 * @desc Get records of feedback-04 form of current uear
 * @route /admin/data/forms/feedback-04
 * @method GET
 * @access Private
 */
export const getFeedback04Data = asyncHandler(async (_req: Request, res: Response) => {
    const currentYear = new Date().getFullYear();

    const data = await FeedbackFour.findAll({
        where: sequelize.where(
            sequelize.fn("YEAR", sequelize.col("createdAt")),
            currentYear
        ),
    });

    res.status(200).json({
        data: data,
    });
});

/**
 * Score Card Data API methods
 */

/**
 * @desc Get data for Teaching Scorecard
 * @route /admin/data/teaching/scorecard/
 * @method GET
 * @access Private
 */
export const getTeachingScoreCardData = asyncHandler(
    async (req: Request, res: Response) => {
        const currentYear = new Date().getFullYear();
        const studentsValidFeedbacks = [];
        const peersValidFeedbacks = [];

        let hoiScore = 0;

        const applicationID = req.headers[applicationHeader];

        const applicationData = await Teaching.findOne({
            where: { id: applicationID },
        });

        if (!applicationData) {
            res.status(404).json({ error: "Application Not Found" });
            return;
        }
        const facultyName = applicationData.faculty_name.trim().toLowerCase();

        const studentFeedbackData = await FeedbackOne.findAll({
            where: {
                [Op.and]: [
                    sequelize.where(
                        sequelize.fn("YEAR", sequelize.col("createdAt")),
                        currentYear
                    ),

                    sequelize.where(
                        sequelize.fn(
                            "TRIM",
                            sequelize.fn("LOWER", sequelize.col("teacher_name"))
                        ),
                        facultyName
                    ),
                ],
            },
        });

        const peerFeedbackData = await FeedbackTwo.findAll({
            where: {
                [Op.and]: [
                    sequelize.where(
                        sequelize.fn("YEAR", sequelize.col("createdAt")),
                        currentYear
                    ),

                    sequelize.where(
                        sequelize.fn(
                            "TRIM",
                            sequelize.fn("LOWER", sequelize.col("teacher_name"))
                        ),
                        facultyName
                    ),
                ],
            },
        });

        // calculate hoi score avg

        hoiScore =
            applicationData.q_01 +
            applicationData.q_02 +
            applicationData.q_03 +
            applicationData.q_04 +
            applicationData.q_05 +
            applicationData.q_06 +
            applicationData.q_07 +
            applicationData.q_08 +
            applicationData.q_09 +
            applicationData.q_10 +
            applicationData.q_11 +
            applicationData.q_12 +
            applicationData.q_13 +
            applicationData.q_14 +
            applicationData.q_15 +
            applicationData.q_16 +
            applicationData.q_17 +
            applicationData.q_18 +
            applicationData.q_19 +
            applicationData.q_20;

        const hoiAverageScore = Number((hoiScore / 20).toFixed(2));

        // calculate ieac score avg

        const ieacAverageScore = Number(
            (
                (Number(applicationData.ieac_scoreA) +
                    Number(applicationData.ieac_scoreB) +
                    Number(applicationData.ieac_scoreC)) /
                3
            ).toFixed(2)
        );

        // filter feedback  current faculty

        for (const feedback of studentFeedbackData) {
            studentsValidFeedbacks.push(feedback);
        }

        for (const feedback of peerFeedbackData) {
            peersValidFeedbacks.push(feedback);
        }

        // calculate feedback sum for each

        let studentFeedbackScoreSum = 0;
        let peersFeedbackScoreSum = 0;

        for (const feedback of studentsValidFeedbacks) {
            studentFeedbackScoreSum +=
                textToScore(feedback.q_01) +
                textToScore(feedback.q_02) +
                feedback.q_03 +
                feedback.q_04 +
                feedback.q_05 +
                textToScore(feedback.q_06) +
                textToScore(feedback.q_07) +
                feedback.q_08 +
                textToScore(feedback.q_09) +
                textToScore(feedback.q_11);
        }

        for (const feedback of peersValidFeedbacks) {
            peersFeedbackScoreSum +=
                textToScore(feedback.q_01) +
                textToScore(feedback.q_02) +
                textToScore(feedback.q_03) +
                textToScore(feedback.q_04) +
                textToScore(feedback.q_05) +
                textToScore(feedback.q_06) +
                textToScore(feedback.q_07) +
                textToScore(feedback.q_08) +
                textToScore(feedback.q_09);
        }

        // calculate average

        const studentsFeedbackAverageScore = Number(
            (
                studentFeedbackScoreSum /
                (10 * studentsValidFeedbacks.length)
            ).toFixed(2)
        );
        const peersFeedbackAverageScore = Number(
            (peersFeedbackScoreSum / (peersValidFeedbacks.length * 9)).toFixed(
                2
            )
        );

        // other required Data

        const categoryOfAward = applicationData.awards_category;
        const institute = applicationData.institution_name;
        const scoreA = Number(applicationData.ieac_scoreA);
        const scoreB = Number(applicationData.ieac_scoreB);
        const scoreC = Number(applicationData.ieac_scoreC);

        res.status(200).json({
            name: facultyName,
            category: categoryOfAward,
            institute: institute,
            scoreA: scoreA,
            scoreB: scoreB,
            scoreC: scoreC,
            hoi_avg: hoiAverageScore,
            ieac_avg: ieacAverageScore,
            student_avg: studentsFeedbackAverageScore,
            peers_avg: peersFeedbackAverageScore,
        });
    }
);

//@desc get scorecard Data for non teaching entries
//@route GET admin/data/teaching/scorecard/:id
//@access Private

/**
 * @desc asyncHandler scorecard data for Non Teaching
 * @route /admin/data/non-teaching/scorecard/:id
 * @method GET
 * @access Private
 */
export const getNonTeachingScoreCardData = asyncHandler(
    async (req: Request, res: Response) => {
        const currentYear = new Date().getFullYear();

        const studentValidFeedbacks = [];
        const peerValidFeedbacks = [];

        const applicationID = req.headers[applicationHeader];

        const applicationData = await NonTeaching.findOne({
            where: { id: applicationID },
        });

        if (!applicationData) {
            res.status(404).json({ error: "Application Not Found" });
            return;
        }
        const theGuy = applicationData.staff_name.trim().toLowerCase();

        const studentFeedbacks = await FeedbackThree.findAll({
            where: {
                [Op.and]: [
                    sequelize.where(
                        sequelize.fn("YEAR", sequelize.col("createdAt")),
                        currentYear
                    ),

                    sequelize.where(
                        sequelize.fn(
                            "TRIM",
                            sequelize.fn(
                                "LOWER",
                                sequelize.col("employee_name")
                            )
                        ),
                        theGuy
                    ),
                ],
            },
        });

        const peersFeedback = await FeedbackFour.findAll({
            where: {
                [Op.and]: [
                    sequelize.where(
                        sequelize.fn("YEAR", sequelize.col("createdAt")),
                        currentYear
                    ),

                    sequelize.where(
                        sequelize.fn(
                            "TRIM",
                            sequelize.fn("LOWER", sequelize.col("nominee_name"))
                        ),
                        theGuy
                    ),
                ],
            },
        });

        // find feedbacks of requested staff

        for (const feedback of studentFeedbacks) {
            studentValidFeedbacks.push(feedback);
        }

        for (const feedback of peersFeedback) {
            peerValidFeedbacks.push(feedback);
        }

        // calculate hoi_avg

        const hoi_avg = Number(
            (
                (applicationData.q_01 +
                    applicationData.q_02 +
                    applicationData.q_03 +
                    applicationData.q_04 +
                    applicationData.q_05 +
                    applicationData.q_06 +
                    applicationData.q_07 +
                    applicationData.q_08 +
                    applicationData.q_09 +
                    applicationData.q_10 +
                    applicationData.q_11 +
                    applicationData.q_12 +
                    applicationData.q_13 +
                    applicationData.q_14 +
                    applicationData.q_15 +
                    applicationData.q_16 +
                    applicationData.q_17 +
                    applicationData.q_18 +
                    applicationData.q_19 +
                    applicationData.q_20 +
                    applicationData.q_21 +
                    applicationData.q_22 +
                    applicationData.q_23 +
                    applicationData.q_24) /
                24
            ).toFixed(2)
        );

        // calculate ieac_avg

        const ieac_avg = Number(
            (
                (Number(applicationData.ieac_scoreA) +
                    Number(applicationData.ieac_scoreB)) /
                2
            ).toFixed(2)
        );

        // calculate student avg

        let studentsFeedbackSum = 0;

        for (const feedback of studentValidFeedbacks) {
            studentsFeedbackSum =
                studentsFeedbackSum +
                textToScore(feedback.q_01) +
                textToScore(feedback.q_02) +
                textToScore(feedback.q_03) +
                textToScore(feedback.q_04) +
                textToScore(feedback.q_05);
        }

        const student_avg = Number(
            (studentsFeedbackSum / (5 * studentValidFeedbacks.length)).toFixed(
                2
            )
        );

        // calculate peers avg

        let peerFeedbackSum = 0;

        for (const feedback of peerValidFeedbacks) {
            peerFeedbackSum =
                peerFeedbackSum +
                textToScore(feedback.q_01) +
                textToScore(feedback.q_02) +
                textToScore(feedback.q_03) +
                textToScore(feedback.q_04) +
                textToScore(feedback.q_05) +
                textToScore(feedback.q_06) +
                textToScore(feedback.q_07) +
                textToScore(feedback.q_08);
        }

        const peers_avg = Number(
            (peerFeedbackSum / (8 * peerValidFeedbacks.length)).toFixed(2)
        );

        // get necessary data

        const name = applicationData.staff_name;
        const category = applicationData.award_category;
        const institute = applicationData.institution_name;
        const scoreA = applicationData.ieac_scoreA;
        const scoreB = applicationData.ieac_scoreB;

        res.status(200).json({
            name: name,
            category: category,
            institute: institute,
            scoreA: scoreA,
            scoreB: scoreB,
            hoi_avg: hoi_avg,
            ieac_avg: ieac_avg,
            student_avg: student_avg,
            peers_avg: peers_avg,
        });
    }
);

/**
 * @desc Get data for scorecard of Inspiring Coach
 * @route /admin/data/sports-coach/scorecard/
 * @method GET
 * @access Private
 */
export const getInspiringCoachScorecard = asyncHandler(
    async (req: Request, res: Response) => {
        const currentYear = new Date().getFullYear();

        const applicationID = req.headers[applicationHeader];

        const response = await Sports.findOne({
            where: { id: applicationID },
        });

        if (!response) {
            res.status(404).json({ error: "Application Not Found" });
            return;
        }

        const theCoach = response.nominee_inspiring_coach;

        const feedbacks = await FeedbackFive.findAll({
            where: {
                [Op.and]: [
                    sequelize.where(
                        sequelize.fn("YEAR", sequelize.col("createdAt")),
                        currentYear
                    ),

                    sequelize.where(
                        sequelize.fn(
                            "TRIM",
                            sequelize.fn("LOWER", sequelize.col("nominee_name"))
                        ),
                        theCoach
                    ),
                ],
            },
        });

        let feedbackScore = 0;

        for (const answers of feedbacks) {
            feedbackScore =
                feedbackScore +
                (answers.q_01 +
                    answers.q_02 +
                    answers.q_03 +
                    answers.q_04 +
                    answers.q_05 +
                    answers.q_06 +
                    answers.q_07 +
                    answers.q_08 +
                    answers.q_09 +
                    answers.q_10 +
                    answers.q_11 +
                    answers.q_12 +
                    answers.q_13 +
                    answers.q_14 +
                    answers.q_15 +
                    answers.q_16 +
                    answers.q_17 +
                    answers.q_18 +
                    answers.q_19 +
                    answers.q_20);
        }

        feedbackScore = feedbackScore / feedbacks.length;

        const admin_score =
            response.q_01 +
            response.q_02 +
            response.q_03 +
            response.q_04 +
            response.q_05 +
            response.q_06 +
            response.q_07 +
            response.q_08 +
            response.q_09 +
            response.q_10 +
            response.q_11 +
            response.q_12 +
            response.q_13 +
            response.q_14 +
            response.q_15 +
            response.q_16 +
            response.q_17 +
            response.q_18 +
            response.q_19 +
            response.q_20;

        const final_score = 0.4 * admin_score + 0.6 * feedbackScore;

        res.status(200).json({
            name: response.nominee_inspiring_coach,
            institute: response.institution_name,
            admin_score,
            feed_score: feedbackScore,
            final_score,
        });
    }
);

//@desc POST results file
//@route POST admin/data/announce-results
//@access Private

/**
 * @desc Get results file
 * @route /admin/data/announce-results
 * @method POST
 * @access Private
 */
export const resultsDataHandler = LogRequest(
    async (req: Request, res: Response) => {
        try {
            await Results.create({
                result: (req as FileRequest).file.path,
            });
        } catch (err) {
            res.status(500);
            throw err;
        }
        res.status(200).json({});
    }
);

/**
 * @desc Get results file
 * @route /admin/data/results
 * @method GET
 * @access Public
 */
export const getResultsData = asyncHandler(async (_req: Request, res: Response) => {
    const currentYear = new Date().getFullYear();

    const result = await Results.findAll({
        where: sequelize.where(
            sequelize.fn("YEAR", sequelize.col("createdAt")),
            currentYear
        ),
    });

    res.status(200).json({
        data: result,
    });
});

/**
 * @desc Get all users
 * @route /admin/data/users
 * @method GET
 * @access Private
 */
export const getUsersData = asyncHandler(async (_req: Request, res: Response) => {
    const result = await User.findAll({
        attributes: {
            exclude: ["password"], // why was this not excluded??
        },
    });

    res.status(200).json({
        data: result,
    });
});

/**
 * @desc Get form preview data
 * @route /admin/data/:formtype/preview/:id
 * @method GET
 * @access Private
 */
export const getFormPreviewData = asyncHandler(async (req: Request, res: Response) => {
    const formType = req.params.formtype;
    const applicationID = req.headers[applicationHeader];

    let application: MyModel | null = null;

    switch (formType) {
        case "outstanding-institution":
            application = await OutstandingInstitution.findOne({
                where: { id: applicationID },
            });
            break;

        case "research":
            application = await Research.findOne({
                where: { id: applicationID },
            });
            break;

        case "sports-boy":
            application = await Sports.findOne({
                where: { id: applicationID },
                attributes: {
                    include: [
                        "id",
                        "email_id",
                        "institution_name",
                        "nominee_ss_boy",
                        "nominee_ss_boy_sport",
                        "nominee_ss_boy_supportings",
                        "q_25",
                        "q_26",
                        "q_27",
                        "q_28",
                    ],
                },
            });
            break;

        case "sports-girl":
            application = await Sports.findOne({
                where: { id: applicationID },
                attributes: {
                    include: [
                        "id",
                        "email_id",
                        "institution_name",
                        "nominee_ss_girl",
                        "nominee_ss_girl_sport",
                        "nominee_ss_girl_photo",
                        "nominee_ss_girl_supportings",
                        "q_21",
                        "q_22",
                        "q_23",
                        "q_24",
                    ],
                },
            });

            break;

        case "sports-coach":
            application = await Sports.findOne({
                where: { id: applicationID },
                attributes: {
                    include: [
                        "id",
                        "email_id",
                        "institution_name",
                        "nominee_inspiring_coach",
                        "nominee_coach_comments",
                        "nominee_coach_photo",
                        "nominee_coach_supportings",
                        "q_01",
                        "q_02",
                        "q_03",
                        "q_04",
                        "q_05",
                        "q_06",
                        "q_07",
                        "q_08",
                        "q_09",
                        "q_10",
                        "q_11",
                        "q_12",
                        "q_13",
                        "q_14",
                        "q_15",
                        "q_16",
                        "q_17",
                        "q_18",
                        "q_19",
                        "q_20",
                    ],
                },
            });

            break;

        case "students":
            application = await Students.findOne({
                where: { id: applicationID },
            });
            break;

        case "teaching":
            application = await Teaching.findOne({
                where: { id: applicationID },
            });
            break;

        case "non-teaching":
            application = await NonTeaching.findOne({
                where: { id: applicationID },
            });
            break;

        default:
            break;
    }

    res.status(200).json({
        data: application,
    });
});

/**
 * @desc Get Jury summary data for teaching
 * @route /admin/data/jury-summary/teaching
 * @method GET
 * @access Private
 */
export const getTeachingJurySummaryData = asyncHandler(
    async (_req: Request, res: Response) => {
        let promisingApprovedData = [];
        let excellenceApprovedData = [];
        let promisingNotApprovedData = [];
        let excellenceNotApprovedData = [];

        const currentYear = new Date().getFullYear();

        // applications
        const applications = await Teaching.findAll({
            where: sequelize.where(
                sequelize.fn("YEAR", sequelize.col("createdAt")),
                currentYear
            ),
        });

        // feedbacks

        const StudentsFeedbacks = await FeedbackOne.findAll({
            where: sequelize.where(
                sequelize.fn("YEAR", sequelize.col("createdAt")),
                currentYear
            ),
        });

        const PeersFeedbacks = await FeedbackTwo.findAll({
            where: sequelize.where(
                sequelize.fn("YEAR", sequelize.col("createdAt")),
                currentYear
            ),
        });

        // calculate scores and add data in respective arrays

        for (const entry of applications) {
            const faculty: TeachingJuryScore = {};
            faculty.id = entry.id;
            faculty.faculty_name = entry.faculty_name;
            faculty.institution_name = entry.institution_name;
            faculty.designation = entry.designation;

            faculty.applicationScore =
                (entry.q_01 +
                    entry.q_02 +
                    entry.q_03 +
                    entry.q_04 +
                    entry.q_05 +
                    entry.q_06 +
                    entry.q_07 +
                    entry.q_08 +
                    entry.q_09 +
                    entry.q_10 +
                    entry.q_11 +
                    entry.q_12 +
                    entry.q_13 +
                    entry.q_14 +
                    entry.q_15 +
                    entry.q_16 +
                    entry.q_17 +
                    entry.q_18 +
                    entry.q_19 +
                    entry.q_20) /
                20;

            const ieacAverageScore =
                Number(
                    (
                        (Number(entry.ieac_scoreA) +
                            Number(entry.ieac_scoreB) +
                            Number(entry.ieac_scoreC)) /
                        3
                    ).toFixed(2)
                ) || 0;

            faculty.applicationScore =
                (faculty.applicationScore + ieacAverageScore / 2) / 2;
            faculty.applicationScore = 0.4 * faculty.applicationScore;

            faculty.groups = Groups[entry.institution_name] || [];
            faculty.ieacApprovedFile = entry.ieacApprovedFile;
            faculty.feedbackScore = 0;

            // calculate feedbackScore

            // segregate feedbacks

            const validStudentsFeedbacks = [];
            const validPeersFeedbacks = [];
            const name = entry.faculty_name.trim().toLowerCase();

            for (const feedback of StudentsFeedbacks) {
                if (name === feedback.teacher_name.trim().toLowerCase()) {
                    validStudentsFeedbacks.push(feedback);
                }
            }

            for (const feedback of PeersFeedbacks) {
                if (name === feedback.teacher_name.trim().toLowerCase()) {
                    validPeersFeedbacks.push(feedback);
                }
            }

            // calculate avg of students feedback

            var studentFeedbackScoreSum = 0;
            var peersFeedbackScoreSum = 0;

            for (const feedback of validStudentsFeedbacks) {
                studentFeedbackScoreSum +=
                    textToScore(feedback.q_01) +
                    textToScore(feedback.q_02) +
                    feedback.q_03 +
                    feedback.q_04 +
                    feedback.q_05 +
                    textToScore(feedback.q_06) +
                    textToScore(feedback.q_07) +
                    feedback.q_08 +
                    textToScore(feedback.q_09) +
                    textToScore(feedback.q_11);
            }

            for (const feedback of validPeersFeedbacks) {
                peersFeedbackScoreSum +=
                    textToScore(feedback.q_01) +
                    textToScore(feedback.q_02) +
                    textToScore(feedback.q_03) +
                    textToScore(feedback.q_04) +
                    textToScore(feedback.q_05) +
                    textToScore(feedback.q_06) +
                    textToScore(feedback.q_07) +
                    textToScore(feedback.q_08) +
                    textToScore(feedback.q_09);
            }

            const studentsFeedbackAverageScore =
                Number(
                    (
                        studentFeedbackScoreSum /
                        (10 * validStudentsFeedbacks.length)
                    ).toFixed(2)
                ) || 0;
            const peersFeedbackAverageScore =
                Number(
                    (
                        peersFeedbackScoreSum /
                        ((validPeersFeedbacks.length || 1) * 9)
                    ).toFixed(2)
                ) || 0;

            faculty.feedbackScore =
                Number(
                    (
                        (0.6 *
                            (studentsFeedbackAverageScore +
                                peersFeedbackAverageScore)) /
                        2
                    ).toFixed(2)
                ) || 0;
            faculty.totalScore =
                faculty.applicationScore + faculty.feedbackScore;

            const teaching_awards_category =
                entry.awards_category as (typeof awards)[number];

            switch (teaching_awards_category) {
                case "Excellence in Teaching (more than 3 years of service)":
                    if (entry.ieacApproved) {
                        excellenceApprovedData.push(faculty);
                    } else {
                        excellenceNotApprovedData.push(faculty);
                    }
                    break;
                case "Promising Teacher of the year (2 to 3 years of service)":
                    if (entry.ieacApproved) {
                        promisingApprovedData.push(faculty);
                    } else {
                        promisingNotApprovedData.push(faculty);
                    }

                    break;
            }
        }

        res.status(200).json({
            promising_approved: promisingApprovedData,
            excellence_approved: excellenceApprovedData,
            promising_notApproved: promisingNotApprovedData,
            excellence_notApproved: excellenceNotApprovedData,
        });
    }
);

/**
 * @desc Get Jury summary data for teaching
 * @route /admin/data/jury-summary/non-teaching
 * @method GET
 * @access Private
 */
export const getNonTeachingJurySummaryData = asyncHandler(
    async (_req: Request, res: Response) => {
        // data

        const data: NonTeachingJuryData = {
            /** Outstanding Employee - Institute (More than 3 years of Service) */
            OEI_3: {
                OK: [],
                NO: [],
            },
            /** Promising Employee - Institute (2 to 3 years of Service) */
            PEI_23: {
                OK: [],
                NO: [],
            },
            /** Outstanding Employee - Somaiya Trust */
            OEST: {
                OK: [],
                NO: [],
            },
            /** Outstanding Employee - Somaiya Vidyavihar University */
            OESVU: {
                OK: [],
                NO: [],
            },
            /** Promising Employee - Somaiya Trust */
            PEST: {
                OK: [],
                NO: [],
            },
            /** Promising Employee - Somaiya Vidyavihar University */
            PESVU: {
                OK: [],
                NO: [],
            },
            /** Outstanding Employee - K. J. Somaiya Hospital */
            OESH: {
                OK: [],
                NO: [],
            },
            /** Promising Employee - K. J. Somaiya Hospital */
            PESH: {
                OK: [],
                NO: [],
            },
        };

        const currentYear = new Date().getFullYear();

        // fetch data

        const applications = await NonTeaching.findAll({
            where: sequelize.where(
                sequelize.fn("YEAR", sequelize.col("createdAt")),
                currentYear
            ),
        });

        const studentsFeedbacks = await FeedbackThree.findAll({
            where: sequelize.where(
                sequelize.fn("YEAR", sequelize.col("createdAt")),
                currentYear
            ),
        });

        const peersFeedbacks = await FeedbackFour.findAll({
            where: sequelize.where(
                sequelize.fn("YEAR", sequelize.col("createdAt")),
                currentYear
            ),
        });

        // calculate scores and add entry in respective category

        for (let entry of applications) {
            let employee: NonTeachingJuryScore = {};
            employee.id = entry.id;
            employee.staff_name = entry.staff_name;
            employee.institution_name = entry.institution_name;
            employee.designation = entry.designation;
            employee.groups = Groups[entry.institution_name] || [];
            employee.ieacApprovedFile = entry.ieacApprovedFile;
            employee.applicationScore =
                Number(
                    (
                        (entry.q_01 +
                            entry.q_02 +
                            entry.q_03 +
                            entry.q_04 +
                            entry.q_05 +
                            entry.q_06 +
                            entry.q_07 +
                            entry.q_08 +
                            entry.q_09 +
                            entry.q_10 +
                            entry.q_11 +
                            entry.q_12 +
                            entry.q_13 +
                            entry.q_14 +
                            entry.q_15 +
                            entry.q_16 +
                            entry.q_17 +
                            entry.q_18 +
                            entry.q_19 +
                            entry.q_20 +
                            entry.q_21 +
                            entry.q_22 +
                            entry.q_23 +
                            entry.q_24) /
                        24
                    ).toFixed(2)
                ) || 0;

            const ieac_avg =
                Number(
                    (
                        (Number(entry.ieac_scoreA) +
                            Number(entry.ieac_scoreB)) /
                        2
                    ).toFixed(2)
                ) || 0;

            employee.applicationScore =
                (employee.applicationScore + ieac_avg / 2) / 2;
            employee.applicationScore = 0.4 * employee.applicationScore;

            employee.feedbackScore = 0;
            employee.totalScore = 0;
            employee.ieacApprovedFile = entry.ieacApprovedFile;

            // calculate feedback score

            // segregate feedbacks
            let studentsValidFeedbacks = [];
            let peersValidFeedbacks = [];

            for (const feedback of studentsFeedbacks) {
                if (
                    entry.staff_name.trim().toLowerCase() ===
                    feedback.employee_name.trim().toLowerCase()
                ) {
                    studentsValidFeedbacks.push(feedback);
                }
            }

            for (const feedback of peersFeedbacks) {
                if (
                    entry.staff_name.trim().toLowerCase() ===
                    feedback.nominee_name.trim().toLowerCase()
                ) {
                    peersValidFeedbacks.push(feedback);
                }
            }

            // calculate avg
            let studentsFeedbackSum = 0;

            for (const feedback of studentsValidFeedbacks) {
                studentsFeedbackSum =
                    studentsFeedbackSum +
                    textToScore(feedback.q_01) +
                    textToScore(feedback.q_02) +
                    textToScore(feedback.q_03) +
                    textToScore(feedback.q_04) +
                    textToScore(feedback.q_05);
            }

            let peerFeedbackSum = 0;

            for (const feedback of peersValidFeedbacks) {
                peerFeedbackSum =
                    peerFeedbackSum +
                    textToScore(feedback.q_01) +
                    textToScore(feedback.q_02) +
                    textToScore(feedback.q_03) +
                    textToScore(feedback.q_04) +
                    textToScore(feedback.q_05) +
                    textToScore(feedback.q_06) +
                    textToScore(feedback.q_07) +
                    textToScore(feedback.q_08);
            }

            const student_avg =
                Number(
                    (
                        studentsFeedbackSum /
                        (5 * studentsValidFeedbacks.length)
                    ).toFixed(2)
                ) || 0;
            const peers_avg =
                Number(
                    (
                        peerFeedbackSum /
                        (8 * peersValidFeedbacks.length)
                    ).toFixed(2)
                ) || 0;

            employee.feedbackScore =
                Number((0.6 * ((student_avg + peers_avg) / 2)).toFixed(2)) || 0;
            employee.totalScore =
                employee.applicationScore + employee.feedbackScore;

            const award = entry.award_category as NonTeachingAward;

            switch (award) {
                case "Outstanding Employee - Institute (More than 3 years of Service)":
                    if (entry.ieacApproved) {
                        data.OEI_3.OK.push(employee);
                    } else {
                        data.OEI_3.NO.push(employee);
                    }

                    break;
                case "Promising Employee - Institute (2 to 3 years of Service)":
                    if (entry.ieacApproved) {
                        data.PEI_23.OK.push(employee);
                    } else {
                        data.PEI_23.NO.push(employee);
                    }

                    break;

                case "Outstanding Employee - Somaiya Trust":
                    if (entry.ieacApproved) {
                        data.OEST.OK.push(employee);
                    } else {
                        data.OEST.NO.push(employee);
                    }

                    break;

                case "Outstanding Employee - Somaiya Vidyavihar University":
                    if (entry.ieacApproved) {
                        data.OESVU.OK.push(employee);
                    } else {
                        data.OESVU.NO.push(employee);
                    }

                    break;

                case "Promising Employee - Somaiya Trust":
                    if (entry.ieacApproved) {
                        data.PEST.OK.push(employee);
                    } else {
                        data.PEST.NO.push(employee);
                    }

                    break;

                case "Promising Employee - Somaiya Vidyavihar University":
                    if (entry.ieacApproved) {
                        data.PESVU.OK.push(employee);
                    } else {
                        data.PESVU.NO.push(employee);
                    }

                    break;

                case "Outstanding Employee - K. J. Somaiya Hospital":
                    if (entry.ieacApproved) {
                        data.OESH.OK.push(employee);
                    } else {
                        data.OESH.NO.push(employee);
                    }

                    break;

                case "Promising Employee - K. J. Somaiya Hospital":
                    if (entry.ieacApproved) {
                        data.PESH.OK.push(employee);
                    } else {
                        data.PESH.NO.push(employee);
                    }

                    break;
            }
        }

        res.status(200).json(data);
    }
);

/**
 * @desc Delete a user
 * @route /admin/data/delete-user
 * @method DELETE
 * @access Private
 */
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.body;

    if (!userId) {
        res.status(400).json({
            error: "Missing userId in the request body",
        });
        return;
    }

    await User.destroy({
        where: { id: userId },
    });

    res.status(200).json({});
});
