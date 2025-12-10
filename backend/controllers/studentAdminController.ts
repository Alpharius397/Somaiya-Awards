import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import sequelize, { Op } from "sequelize";
import { Students } from "../models";

/**
 * @desc Get Somaiya Star Girl
 * @route /students-admin/data/somaiya-star-girl
 * @method GET
 * @access Private
 */
export const somaiyaStarGirlDataHandler = asyncHandler(
    async (_req: Request, res: Response, next: NextFunction) => {
        const currentYear = new Date().getFullYear();

        const data = await Students.findAll({
            where: {
                [Op.and]: [
                    sequelize.where(
                        sequelize.fn("YEAR", sequelize.col("createdAt")),
                        currentYear
                    ),
                    { nomination_category: "Somaiya Star -Girl" },
                ],
            },
        });

        res.status(200).json({
            message: "Request Successful",
            data: data,
        });
        next();
    }
);

/**
 * @desc Get Somaiya Star Boy
 * @route /students-admin/data/somaiya-star-boy
 * @method GET
 * @access Private
 */
export const somaiyaStarBoyDataHandler = asyncHandler(
    async (_req: Request, res: Response, next: NextFunction) => {
        const currentYear = new Date().getFullYear();

        const data = await Students.findAll({
            where: {
                [Op.and]: [
                    sequelize.where(
                        sequelize.fn("YEAR", sequelize.col("createdAt")),
                        currentYear
                    ),
                    { nomination_category: "Somaiya Star -Boy" },
                ],
            },
        });

        res.status(200).json({
            message: "Request Successful",
            data: data,
        });
        next();
    }
);

/**
 * @desc Get Somaiya Star Innovator
 * @route /students-admin/data/somaiya-star-innovator
 * @method GET
 * @access Private
 */
export const somaiyaStarInnovatorDataHandler = asyncHandler(
    async (_req: Request, res: Response, next: NextFunction) => {
        const currentYear = new Date().getFullYear();

        const data = await Students.findAll({
            where: {
                [Op.and]: [
                    sequelize.where(
                        sequelize.fn("YEAR", sequelize.col("createdAt")),
                        currentYear
                    ),
                    { nomination_category: "Somaiya Star Innovator" },
                ],
            },
        });

        res.status(200).json({
            message: "Request Successful",
            data: data,
        });
        next();
    }
);

/**
 * @desc Get Somaiya Star Citizen
 * @route /students-admin/data/somaiya-star-citizen
 * @method GET
 * @access Private
 */
export const somaiyaStarCitizenDataHandler = asyncHandler(
    async (_req: Request, res: Response, next: NextFunction) => {
        const currentYear = new Date().getFullYear();

        const data = await Students.findAll({
            where: {
                [Op.and]: [
                    sequelize.where(
                        sequelize.fn("YEAR", sequelize.col("createdAt")),
                        currentYear
                    ),
                    { nomination_category: "Somaiya Star Citizen" },
                ],
            },
        });

        res.status(200).json({
            message: "Request Successful",
            data: data,
        });
        next();
    }
);

/**
 * @desc Get Somaiya Green Star
 * @route /students-admin/data/somaiya-green-star
 * @method GET
 * @access Private
 */
export const somaiyaGreenStarDataHandler = asyncHandler(
    async (_req: Request, res: Response, next: NextFunction) => {
        const currentYear = new Date().getFullYear();

        const data = await Students.findAll({
            where: {
                [Op.and]: [
                    sequelize.where(
                        sequelize.fn("YEAR", sequelize.col("createdAt")),
                        currentYear
                    ),
                    { nomination_category: "Somaiya Green Star/ Green Force" },
                ],
            },
        });

        res.status(200).json({
            message: "Request Successful",
            data: data,
        });
        next();
    }
);

export const studentsDataUpdater = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { applicationID } = req.body;

        const applicationForm = await Students.findOne({
            where: { id: applicationID },
        });
        if (!applicationForm) {
            res.status(404);
            throw new Error("Application not found");
        }

        await applicationForm.update({ approved: true });

        res.status(200).json({
            message: "Update Successful",
        });
        next();
    }
);
