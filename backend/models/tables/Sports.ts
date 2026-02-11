import { InstitutesType } from "@/shared/constants";
import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface SportsAttributes {
    id: number;
    email_id: string;
    institution_name: InstitutesType;
    nominee_inspiring_coach: string;
    nominee_coach_comments: string;
    nominee_coach_photo: string;
    nominee_coach_supportings: string;
    q_01: number;
    q_02: number;
    q_03: number;
    q_04: number;
    q_05: number;
    q_06: number;
    q_07: number;
    q_08: number;
    q_09: number;
    q_10: number;
    q_11: number;
    q_12: number;
    q_13: number;
    q_14: number;
    q_15: number;
    q_16: number;
    q_17: number;
    q_18: number;
    q_19: number;
    q_20: number;
    isApprovedCoach: boolean | null;
    nominee_ss_girl: string;
    nominee_ss_girl_sport: string;
    nominee_ss_girl_photo: string;
    nominee_ss_girl_supportings: string;
    q_21: number;
    q_22: number;
    q_23: number;
    q_24: number;
    isApprovedSportsGirl: boolean | null;
    nominee_ss_boy: string;
    nominee_ss_boy_sport: string;
    nominee_ss_boy_photo: string;
    nominee_ss_boy_supportings: string;
    q_25: number;
    q_26: number;
    q_27: number;
    q_28: number;
    isApprovedSportsBoy: boolean | null;
    createdAt?: Date;
    updatedAt?: Date;
}

interface StudentCreationAttributes extends Optional<
    SportsAttributes,
    "id" | "createdAt" | "updatedAt"
> {}

export class Sports
    extends Model<SportsAttributes, StudentCreationAttributes>
    implements SportsAttributes
{
    declare id: number;
    declare email_id: string;
    declare institution_name: InstitutesType;
    declare nominee_inspiring_coach: string;
    declare nominee_coach_comments: string;
    declare nominee_coach_photo: string;
    declare nominee_coach_supportings: string;
    declare q_01: number;
    declare q_02: number;
    declare q_03: number;
    declare q_04: number;
    declare q_05: number;
    declare q_06: number;
    declare q_07: number;
    declare q_08: number;
    declare q_09: number;
    declare q_10: number;
    declare q_11: number;
    declare q_12: number;
    declare q_13: number;
    declare q_14: number;
    declare q_15: number;
    declare q_16: number;
    declare q_17: number;
    declare q_18: number;
    declare q_19: number;
    declare q_20: number;
    declare isApprovedCoach: boolean | null;
    declare nominee_ss_girl: string;
    declare nominee_ss_girl_sport: string;
    declare nominee_ss_girl_photo: string;
    declare nominee_ss_girl_supportings: string;
    declare q_21: number;
    declare q_22: number;
    declare q_23: number;
    declare q_24: number;
    declare isApprovedSportsGirl: boolean | null;
    declare nominee_ss_boy: string;
    declare nominee_ss_boy_sport: string;
    declare nominee_ss_boy_photo: string;
    declare nominee_ss_boy_supportings: string;
    declare q_25: number;
    declare q_26: number;
    declare q_27: number;
    declare q_28: number;
    declare isApprovedSportsBoy: boolean | null;
    declare readonly createdAt?: Date;
    declare readonly updatedAt?: Date;
}

export default function SportsInit(sequelize: Sequelize) {
    Sports.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            email_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            institution_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nominee_inspiring_coach: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nominee_coach_comments: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            nominee_coach_photo: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nominee_coach_supportings: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            q_01: { type: DataTypes.INTEGER, allowNull: false },
            q_02: { type: DataTypes.INTEGER, allowNull: false },
            q_03: { type: DataTypes.INTEGER, allowNull: false },
            q_04: { type: DataTypes.INTEGER, allowNull: false },
            q_05: { type: DataTypes.INTEGER, allowNull: false },
            q_06: { type: DataTypes.INTEGER, allowNull: false },
            q_07: { type: DataTypes.INTEGER, allowNull: false },
            q_08: { type: DataTypes.INTEGER, allowNull: false },
            q_09: { type: DataTypes.INTEGER, allowNull: false },
            q_10: { type: DataTypes.INTEGER, allowNull: false },
            q_11: { type: DataTypes.INTEGER, allowNull: false },
            q_12: { type: DataTypes.INTEGER, allowNull: false },
            q_13: { type: DataTypes.INTEGER, allowNull: false },
            q_14: { type: DataTypes.INTEGER, allowNull: false },
            q_15: { type: DataTypes.INTEGER, allowNull: false },
            q_16: { type: DataTypes.INTEGER, allowNull: false },
            q_17: { type: DataTypes.INTEGER, allowNull: false },
            q_18: { type: DataTypes.INTEGER, allowNull: false },
            q_19: { type: DataTypes.INTEGER, allowNull: false },
            q_20: { type: DataTypes.INTEGER, allowNull: false },
            q_21: { type: DataTypes.INTEGER, allowNull: false },
            q_22: { type: DataTypes.INTEGER, allowNull: false },
            q_23: { type: DataTypes.INTEGER, allowNull: false },
            q_24: { type: DataTypes.INTEGER, allowNull: false },
            isApprovedCoach: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            nominee_ss_girl: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nominee_ss_girl_sport: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nominee_ss_girl_photo: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nominee_ss_girl_supportings: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isApprovedSportsGirl: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            nominee_ss_boy: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nominee_ss_boy_sport: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nominee_ss_boy_photo: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nominee_ss_boy_supportings: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            q_25: { type: DataTypes.INTEGER, allowNull: false },
            q_26: { type: DataTypes.INTEGER, allowNull: false },
            q_27: { type: DataTypes.INTEGER, allowNull: false },
            q_28: { type: DataTypes.INTEGER, allowNull: false },
            isApprovedSportsBoy: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: "Sports",
        }
    );
    return Sports;
}
