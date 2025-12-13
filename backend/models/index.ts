import { Sequelize } from "sequelize";
import process from "process";
import InitDB from "@/models/tables";

const prod = process.env.PROD === "1";

const env = prod ? "production" : "development";
const config = require(__dirname + "/../config/config.json")[env];

const s: Sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

export const {
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
    FeedbackFive,
    House,
} = InitDB(s);

export const sequelize = s;
