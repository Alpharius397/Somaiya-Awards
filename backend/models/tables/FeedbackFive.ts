import { InstitutesType } from "@/shared/constants";
import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface FeedbackFiveAttributes {
    id: number;
    rater_name: string;
    somaiya_mail_id: string;
    institution_name: InstitutesType;
    nominee_name: string;
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
    createdAt?: Date;
    updatedAt?: Date;
}

interface FeedbackFiveCreationAttributes extends Optional<
    FeedbackFiveAttributes,
    "id" | "createdAt" | "updatedAt"
> {}

export class FeedbackFive
    extends Model<FeedbackFiveAttributes, FeedbackFiveCreationAttributes>
    implements FeedbackFiveAttributes
{
    declare id: number;
    declare rater_name: string;
    declare somaiya_mail_id: string;
    declare institution_name: InstitutesType;
    declare nominee_name: string;
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
    declare readonly createdAt?: Date;
    declare readonly updatedAt?: Date;
}

export default function FeedbackFiveInit(sequelize: Sequelize) {
    FeedbackFive.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            rater_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            somaiya_mail_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            institution_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nominee_name: {
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
        },
        {
            sequelize,
            tableName: "FeedbackFive",
        }
    );
    return FeedbackFive;
}
