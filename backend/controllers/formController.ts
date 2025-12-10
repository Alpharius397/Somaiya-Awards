import { Op } from "sequelize";
import {
    OutstandingInstitutionForm,
    OutstandingInstitutionType,
} from "../zod/form/OutstandingInstitution";
import {
    FeedbackOne,
    FeedbackTwo,
    FeedbackThree,
    FeedbackFour,
    NonTeaching,
    OutstandingInstitution,
    Research,
    FeedbackFive,
    Sports,
    Students,
    Teaching,
} from "../models";

import asyncHandler from "express-async-handler";
import { FileRequest } from "../types/request";
import { checkFiles, checkObject } from "../controllers";
import { ResearchForm, ResearchType } from "../zod/form/Research";
import { SportsForm, SportsType } from "../zod/form/Sports";
import { sequelize } from "../models";
import { TeachingForm, TeachingType } from "../zod/form/Teaching";
import { NonTeachingForm, NonTeachingType } from "../zod/form/NonTeaching";
import { StudentsForm, StudentsType } from "../zod/form/Students";
import { FeedbackOneType } from "../zod/form/FeedbackOne";
import { FeedbackOneForm } from "../zod/form/FeedbackOneForm";
import { FeedbackTwoForm, FeedbackTwoType } from "../zod/form/FeedbackTwo";
import { FeedbackThreeType } from "../zod/form/FeedbackThree";
import { FeedbackThreeForm } from "../zod/form/FeedbackThreeForm";
import { FeedbackFourForm, FeedbackFourType } from "../zod/form/FeedbackFour";
import { FeedbackFiveForm, FeedbackFiveType } from "../zod/form/FeedbackFive";
import z from "zod";
import { validString, email } from "../zod";
import { Request, Response, NextFunction } from "express";

/**
 * @desc Handle OutstandingInstitution form submission
 * @route /forms/outstanding-institution
 * @method POST
 * @access Private
 */
export const submitForm_01 = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const supportings = (req as FileRequest).file?.path;
        const response = checkObject<OutstandingInstitutionType>(
            {
                ...req.body,
                supportings,
            },
            OutstandingInstitutionForm,
            res
        );

        var result: unknown;
        try {
            result = await OutstandingInstitution.create(response);
        } catch (err: unknown) {
            res.status(500);
            throw err;
        }

        if (!result) {
            // throw error
            res.status(500);
            throw new Error("Failed to accept your response");
        }

        res.status(200).json({
            message: "Form submitted successfully",
            submitted: true,
        });
        next();
    }
);

/**
 * @desc Handle Research form submission
 * @route /forms/research
 * @method POST
 * @access Private
 */
export const submitForm_02 = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const files = checkFiles(req, res);

        const evidence_of_research = files.evidence_of_research[0]?.path;
        const evidence_of_data_provided =
            files.evidence_of_data_provided[0]?.path;

        const response = checkObject<ResearchType>(
            {
                ...req.body,
                evidence_of_research,
                evidence_of_data_provided,
            },
            ResearchForm,
            res
        );

        var result: unknown;
        try {
            result = await Research.create(response);
        } catch (err: unknown) {
            res.status(500);
            throw err;
        }

        if (!result) {
            // throw error
            res.status(500);
            throw new Error("Failed to accept your response");
        }

        res.status(200).json({
            message: "Form submitted successfully",
            submitted: true,
        });
        next();
    }
);

/**
 * @desc Handle Sports form submission
 * @route /forms/sports
 * @method POST
 * @access Private
 */
export const submitForm_03 = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const files = checkFiles(req, res);

        const nominee_coach_photo = files.nominee_coach_photo[0]?.path;
        const nominee_coach_supportings =
            files.nominee_coach_supportings[0]?.path;

        const nominee_ss_girl_photo = files.nominee_ss_girl_photo[0]?.path;
        const nominee_ss_girl_supportings =
            files.nominee_ss_girl_supportings[0]?.path;

        const nominee_ss_boy_photo = files.nominee_ss_boy_photo[0]?.path;
        const nominee_ss_boy_supportings =
            files.nominee_ss_boy_supportings[0]?.path;

        const response = checkObject<SportsType>(
            {
                ...req.body,
                nominee_ss_boy_supportings,
                nominee_ss_boy_photo,
                nominee_ss_girl_photo,
                nominee_ss_girl_supportings,
                nominee_coach_photo,
                nominee_coach_supportings,
            },
            SportsForm,
            res
        );

        var result: unknown;
        try {
            result = await Sports.create(response);
        } catch (err: unknown) {
            res.status(500);
            throw err;
        }

        if (!result) {
            // throw error
            res.status(500);
            throw new Error("Failed to accept your response");
        }

        res.status(200).json({
            message: "Form submitted successfully",
            submitted: true,
        });
        next();
    }
);

/**
 * @desc Handle Teaching form submission
 * @route /forms/teaching
 * @method POST
 * @access Private
 */
export const submitForm_04 = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const quick = z.object({
            somaiya_mail_id: email,
            awards_category: validString,
        });
        type QuickType = z.infer<typeof quick>;
        const { somaiya_mail_id, awards_category } = checkObject<QuickType>(
            req.body,
            quick,
            res
        );

        // Check if an entry with the same year, email, and awards category already exists
        // const existingTeachingEntry = await Teaching.findOne({
        //     where: {
        //         [Op.and]: [
        //             { somaiya_mail_id: somaiya_mail_id },
        //             { awards_category: awards_category },
        //             sequelize.literal("YEAR(createdAt) = YEAR(CURDATE())"),
        //         ],
        //     },
        // });

        // if (existingTeachingEntry) {
        //     res.status(400).json({
        //         message:
        //             "A duplicate entry already exists for this year, email, and awards category.",
        //         submitted: false,
        //         data: existingTeachingEntry,
        //     });
        //     return;
        // }
        let { ip, baseUrl, url, file, files, headers } = req;
        console.log(JSON.stringify({ ip, baseUrl, url, file, files, headers }));
        files = checkFiles(req, res);

        const data_evidence = files.data_evidence[0]?.path;
        const profile_photograph = files.profile_photograph[0]?.path;

        const response = checkObject<TeachingType>(
            { ...req.body, data_evidence, profile_photograph },
            TeachingForm,
            res
        );

        console.log(response);
        var result: unknown;
        try {
            result = await Teaching.create(response);
        } catch (err: unknown) {
            res.status(500);
            throw err;
        }

        if (!result) {
            // throw error
            res.status(500);
            throw new Error("Failed to accept your response");
        }

        res.status(200).json({
            message: "Form submitted successfully",
            submitted: true,
        });
        next();
    }
);

/**
 * @desc Handle Non Teaching form submission
 * @route /forms/non-teaching
 * @method POST
 * @access Private
 */
export const submitForm_05 = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        let quick = z.object({
            somaiya_email_id: email,
            award_category: validString,
        });
        const { somaiya_email_id, award_category } = checkObject<
            z.infer<typeof quick>
        >(req.body, quick, res);

        // Check if an entry with the same year, email, and awards category already exists
        const existingNonTeachingEntry = await NonTeaching.findOne({
            where: {
                [Op.and]: [
                    { somaiya_email_id: somaiya_email_id },
                    { award_category: award_category },
                    sequelize.literal("YEAR(createdAt) = YEAR(CURDATE())"),
                ],
            },
        });

        if (existingNonTeachingEntry) {
            res.status(400).json({
                message:
                    "A duplicate entry already exists for this year, email, and awards category.",
                submitted: false,
                data: existingNonTeachingEntry,
            });
            return;
        }

        const files = checkFiles(req, res);

        const proof_docs = files.proof_docs[0]?.path;
        const nominee_photograph = files.nominee_photograph[0]?.path;

        const response = checkObject<NonTeachingType>(
            { ...req.body, proof_docs, nominee_photograph },
            NonTeachingForm,
            res
        );

        var result: unknown;
        try {
            result = await NonTeaching.create(response);
        } catch (err: unknown) {
            res.status(500);
            throw err;
        }

        if (!result) {
            // throw error
            res.status(500);
            throw new Error("Failed to accept your response");
        }

        res.status(200).json({
            message: "Form submitted successfully",
            submitted: true,
        });
        next();
    }
);

/**
 * @desc Handle Students form submission
 * @route /forms/research
 * @method POST
 * @access Private
 */
export const submitForm_10 = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const supportings = (req as FileRequest).file?.path;
        const response = checkObject<StudentsType>(
            { ...req.body, supportings },
            StudentsForm,
            res
        );

        var result: unknown;
        try {
            result = await Students.create(response);
        } catch (err: unknown) {
            res.status(500);
            throw err;
        }

        if (!result) {
            // throw error
            res.status(500);
            throw new Error("Failed to accept your response");
        }

        res.status(200).json({
            message: "Form submitted successfully",
            submitted: true,
        });
        next();
    }
);

/**
 * @desc Handle FeedbackOne (Student feedback for Teaching)
 * @route /forms/feedback-01
 * @method POST
 * @access Private
 */
export const submitFeedback_01 = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const response = checkObject<FeedbackOneType>(
            req.body,
            FeedbackOneForm,
            res
        );
        var result: unknown;
        try {
            result = await FeedbackOne.create(response);
        } catch (err: unknown) {
            res.status(500);
            throw err;
        }

        if (!result) {
            // throw error
            res.status(500);
            throw new Error("Failed to accept your response");
        }

        res.status(200).json({
            message: "Form submitted successfully",
            submitted: true,
        });
        next();
    }
);

/**
 * @desc Handle FeedbackTwo (Peer feedback for Teaching)
 * @route /forms/feedback-02
 * @method POST
 * @access Private
 */
export const submitFeedback_02 = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const response = checkObject<FeedbackTwoType>(
            req.body,
            FeedbackTwoForm,
            res
        );
        var result: unknown;
        try {
            result = await FeedbackTwo.create(response);
        } catch (err: unknown) {
            res.status(500);
            throw err;
        }

        if (!result) {
            // throw error
            res.status(500);
            throw new Error("Failed to accept your response");
        }

        res.status(200).json({
            message: "Form submitted successfully",
            submitted: true,
        });
        next();
    }
);

/**
 * @desc Handle FeedbackThree form submission (Students feedback for Non Teaching)
 * @route /forms/feedback-03
 * @method POST
 * @access Private
 */
export const submitFeedback_03 = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const response = checkObject<FeedbackThreeType>(
            req.body,
            FeedbackThreeForm,
            res
        );
        var result: unknown;
        try {
            result = await FeedbackThree.create(response);
        } catch (err: unknown) {
            res.status(500);
            throw err;
        }

        if (!result) {
            // throw error
            res.status(500);
            throw new Error("Failed to accept your response");
        }

        res.status(200).json({
            message: "Form submitted successfully",
            submitted: true,
        });
        next();
    }
);

/**
 * @desc Handle FeedbackFour form submission (Peer feedback for Non Teaching)
 * @route /forms/feedback-04
 * @method POST
 * @access Private
 */
export const submitFeedback_04 = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const response = checkObject<FeedbackFourType>(
            req.body,
            FeedbackFourForm,
            res
        );

        var result: unknown;
        try {
            result = await FeedbackFour.create(response);
        } catch (err: unknown) {
            res.status(500);
            throw err;
        }

        if (!result) {
            // throw error
            res.status(500);
            throw new Error("Failed to accept your response");
        }

        res.status(200).json({
            message: "Form submitted successfully",
            submitted: true,
        });
        next();
    }
);

/**
 * @desc Handle FeedbackFive form submission (Students feedback for Sports Incharge)
 * @route /forms/feedback-05
 * @method POST
 * @access Private
 */
export const submitFeedback_05 = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const response = checkObject<FeedbackFiveType>(
            req.body,
            FeedbackFiveForm,
            res
        );
        var result: unknown;
        try {
            result = await FeedbackFive.create(response);
        } catch (err: unknown) {
            res.status(500);
            throw err;
        }

        if (!result) {
            // throw error
            res.status(500);
            throw new Error("Failed to accept your response");
        }

        res.status(200).json({
            message: "Form submitted successfully",
            submitted: true,
        });
        next();
    }
);
