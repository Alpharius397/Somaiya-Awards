import asyncHandler from "express-async-handler";
import { AuthRequest } from "../types/request";
import { NonTeaching, sequelize } from "../models";
import { Request, Response, NextFunction } from "express";
import {
    OutstandingInstitution,
    Research,
    Sports,
    Students,
    Teaching,
} from "../models";

/**
 * @desc Get data of OutstandingInstitution
 * @route /hoi/data/outstanding-institution
 * @method GET
 * @access Private
 */
export const institutionDataHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const user_institution = (req as AuthRequest).user.institution;

        const currentYear = new Date().getFullYear();

        const data = await OutstandingInstitution.findAll({
            where: sequelize.and(
                // raw SQL query using and operator
                sequelize.literal(`YEAR(createdAt) = ${currentYear}`), // match current Year
                { institution_name: user_institution }
            ),
        });

        res.status(200).json({
            data: data,
        });
        next();
    }
);

/**
 * @desc Get data of Research
 * @route /hoi/data/research
 * @method GET
 * @access Private
 */
export const researchDataHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const user_institution = (req as AuthRequest).user.institution;

        const currentYear = new Date().getFullYear();

        const data = await Research.findAll({
            where: sequelize.and(
                // raw SQL query using and operator
                sequelize.literal(`YEAR(createdAt) = ${currentYear}`), // match current Year
                { institution_name: user_institution }
            ),
        });

        res.status(200).json({
            data: data,
        });
        next();
    }
);

/**
 * @desc Get data of Sports
 * @route /hoi/data/sports
 * @method GET
 * @access Private
 */
export const sportsDataHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const user_institution = (req as AuthRequest).user.institution;

        const currentYear = new Date().getFullYear();

        const data = await Sports.findAll({
            where: sequelize.and(
                // raw SQL query using and operator
                sequelize.literal(`YEAR(createdAt) = ${currentYear}`), // match current Year
                { institution_name: user_institution }
            ),
        });

        res.status(200).json({
            data: data,
        });
        next();
    }
);

/**
 * @desc Get data of Teaching
 * @route /hoi/data/teaching
 * @method GET
 * @access Private
 */
export const teachingDataHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const user_institution = (req as AuthRequest).user.institution;

        const currentYear = new Date().getFullYear();

        const data = await Teaching.findAll({
            where: sequelize.and(
                // raw SQL query using and operator
                sequelize.literal(`YEAR(createdAt) = ${currentYear}`), // match current Year
                { institution_name: user_institution }
            ),
        });

        res.status(200).json({
            data: data,
        });
        next();
    }
);

/**
 * @desc Data of Non Teaching
 * @route /hoi/data/non-teaching
 * @method GET
 * @access Private
 */
export const nonTeachingDataHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const user_institution = (req as AuthRequest).user.institution;

        const currentYear = new Date().getFullYear();

        const data = await NonTeaching.findAll({
            where: sequelize.and(
                // raw SQL query using and operator
                sequelize.literal(`YEAR(createdAt) = ${currentYear}`), // match current Year
                { institution_name: user_institution }
            ),
        });

        res.status(200).json({
            data: data,
        });
        next();
    }
);

/**
 * @desc Get data of Students
 * @route /hoi/data/students
 * @method GET
 * @access Private
 */
export const studentsDataHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const user_institution = (req as AuthRequest).user.institution;

        const currentYear = new Date().getFullYear();

        const data = await Students.findAll({
            where: sequelize.and(
                // raw SQL query using and operator
                sequelize.literal(`YEAR(createdAt) = ${currentYear}`), // match current Year
                { institution_name: user_institution }
            ),
        });

        res.status(200).json({
            data: data,
        });
        next();
    }
);
