import asyncHandler from "express-async-handler";
import { AuthRequest, FileRequest } from "../types/request";
import { NonTeaching, sequelize } from "../models";
import { OutstandingInstitution, Teaching } from "../models";
import { Op } from "sequelize";
import { instituteHeader } from "../constants";

/**
 * @desc Get data of OutstandingInstitution
 * @route /ieac/data/outstanding-institution
 * @method GET
 * @access Private
 */
export const institutionDataHandler = asyncHandler(async (_req, res) => {
    const currentYear = new Date().getFullYear();

    const data = await OutstandingInstitution.findAll({
        where: sequelize.and(
            // raw SQL query using and operator
            sequelize.literal(`YEAR(createdAt) = ${currentYear}`) // match current Year
        ),
    });

    res.status(200).json({
        data: data,
    });
});

/**
 * @desc Get data of Teaching
 * @route /ieac/data/teaching
 * @method GET
 * @access Private
 */
export const teachingDataHandler = asyncHandler(async (_req, res) => {
    const currentYear = new Date().getFullYear();

    const data = await Teaching.findAll({
        where: sequelize.and(
            // raw SQL query using and operator
            sequelize.literal(`YEAR(createdAt) = ${currentYear}`) // match current Year
        ),
    });

    res.status(200).json({
        data: data,
    });
});

/**
 * @desc Get data of Non Teaching
 * @route /ieac/data/non-teaching
 * @method GET
 * @access Private
 */
export const nonTeachingDataHandler = asyncHandler(async (_req, res) => {
    const currentYear = new Date().getFullYear();

    const data = await NonTeaching.findAll({
        where: sequelize.and(
            // raw SQL query using and operator
            sequelize.literal(`YEAR(createdAt) = ${currentYear}`) // match current Year
        ),
    });

    res.status(200).json({
        data: data,
    });
});

/**
 * @desc Update IEAC score for Teaching
 * @route /ieac/data/teaching
 * @method PUT
 * @access Private
 */
// TODO: add zod for this
export const teachingDataUpdater = asyncHandler(async (req, res) => {
    const { scoreA, scoreB, scoreC, recommended, applicationID } = req.body;

    const applicationForm = await Teaching.findOne({
        where: { id: applicationID },
    });
    if (!applicationForm) {
        res.status(404);
        throw new Error("Application not found");
    }
    await applicationForm.update({
        ieac_scoreA: scoreA,
        ieac_scoreB: scoreB,
        ieac_scoreC: scoreC,
        ieacApproved: recommended,
    });

    res.status(200).json({
        message: "Update Successful",
    });
});

/**
 * @desc Update IEAC score for Teaching
 * @route /ieac/data/teaching
 * @method PUT
 * @access Private
 */ export const nonTeachingDataUpdater = asyncHandler(async (req, res) => {
    const { scoreA, scoreB, recommended, applicationID } = req.body;

    const applicationForm = await NonTeaching.findOne({
        where: { id: applicationID },
    });
    if (!applicationForm) {
        res.status(404);
        throw new Error("Application not found");
    }

    await applicationForm.update({
        ieac_scoreA: scoreA,
        ieac_scoreB: scoreB,
        ieacApproved: recommended,
    });

    res.status(200).json({
        message: "Update Successful",
    });
});

/**
 * @desc Handle IEAC approved file for Teaching
 * @route /ieac/data/teaching
 * @method POST
 * @access Private
 */
export const teachingRecFileHandler = asyncHandler(async (req, res) => {
    const ieacApprovedFile = (req as FileRequest).file.path;

    await Teaching.update(
        {
            ieacApprovedFile: ieacApprovedFile,
        },
        {
            where: {
                [Op.and]: [
                    {
                        institution_name: (req as AuthRequest).user
                            .institution as string,
                    },
                    sequelize.literal("YEAR(createdAt) = YEAR(CURDATE())"),
                ],
            },
        }
    );

    res.status(200).json({
        file: ieacApprovedFile,
        message: "File uploaded successfully!",
    });
});

/**
 * @desc Handle IEAC approved file for Non Teaching
 * @route /ieac/data/teaching
 * @method POST
 * @access Private
 */
export const nonTeachingRecFileHandler = asyncHandler(async (req, res) => {
    const ieacApprovedFile = (req as FileRequest).file.path;

    await NonTeaching.update(
        {
            ieacApprovedFile: ieacApprovedFile,
        },
        {
            where: {
                [Op.and]: [
                    sequelize.literal("YEAR(createdAt) = YEAR(CURDATE())"),
                    {
                        institution_name: (req as AuthRequest).user
                            .institution as string,
                    },
                ],
            },
        }
    );

    res.status(200).json({
        file: ieacApprovedFile,
        message: "File uploaded successfully!",
    });
});

/**
 * @desc Get nominated Teachings data
 * @route /ieac/data/nominated-faculty-names
 * @method GET
 * @access Public
 */
export const getNominatedTeacherNames = asyncHandler(async (req, res) => {
    const names = [];

    const institute_name = req.headers[instituteHeader];

    if (!institute_name) {
        res.status(400).json({
            message: "Invalid Institute Header",
        });
        return;
    }

    if (Array.isArray(institute_name)) {
        res.status(400).json({
            error: "Received Multiple Headers",
        });
        return;
    }

    const conditions = {
        [Op.or]: [{ institution_name: institute_name }],
    };

    //TODO: Get rid of this
    // const laxmiRegex = /Somaiya Vidyamandir,\s+Laxmiwadi/.test(institute_name);
    //
    // if (laxmiRegex) {
    //     conditions[Op.or] = [
    //         { institution_name: "Somaiya Vidyamandir,  Laxmiwadi" },
    //         { institution_name: "Somaiya Vidyamandir, Laxmiwadi" },
    //     ];
    // }

    const result = await Teaching.findAll({
        where: {
            [Op.and]: [
                conditions,
                { ieacApproved: true },
                sequelize.literal("YEAR(createdAt) = YEAR(CURDATE())"),
            ],
        },
        attributes: ["faculty_name"],
    });

    for (const feedback of result) {
        names.push(feedback.faculty_name);
    }

    res.status(200).json({
        data: names,
    });
});

/**
 * @desc Get nominated NonTeaching data
 * @route /ieac/data/nominated-staff-names
 * @method GET
 * @access Public
 */
export const getNominatedStaffNames = asyncHandler(async (req, res) => {
    const names = [];
    const institute_name = req.headers[instituteHeader];

    if (!institute_name) {
        res.status(400).json({
            message: "Invalid Institute Header",
        });
        return;
    }

    if (Array.isArray(institute_name)) {
        res.status(400).json({
            error: "Received Multiple Headers",
        });
        return;
    }

    const conditions = {
        [Op.or]: [{ institution_name: institute_name }],
    };

    //TODO: Get rid of this
    // const laxmiRegex = /Somaiya Vidyamandir,\s+Laxmiwadi/.test(institute_name);
    //
    // if (laxmiRegex) {
    //     conditions[Op.or] = [
    //         { institution_name: "Somaiya Vidyamandir,  Laxmiwadi" },
    //         { institution_name: "Somaiya Vidyamandir, Laxmiwadi" },
    //     ];
    // }

    const result = await NonTeaching.findAll({
        where: {
            [Op.and]: [
                conditions,
                { ieacApproved: true },
                sequelize.literal("YEAR(createdAt) = YEAR(CURDATE())"),
            ],
        },
        attributes: ["staff_name"],
    });

    for (const feedback of result) {
        names.push(feedback.staff_name);
    }

    res.status(200).json({
        data: names,
    });
});
