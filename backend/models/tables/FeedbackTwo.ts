import { InstitutesType } from "@/shared/constants";
import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface FeedbackTwoAttributes {
    id: number;
    rater_name: string;
    institution_name: InstitutesType;
    department_name: string;
    designation: string;
    somaiya_mail_id: string;
    contact_number: string;
    teacher_name: string;
    nomination_category: string;
    q_01: string;
    q_02: string;
    q_03: string;
    q_04: string;
    q_05: string;
    q_06: string;
    q_07: string;
    q_08: string;
    q_09: string;
    nomination_reason: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface FeedbackTwoCreationAttributes extends Optional<
    FeedbackTwoAttributes,
    "id" | "createdAt" | "updatedAt"
> {}

export class FeedbackTwo
    extends Model<FeedbackTwoAttributes, FeedbackTwoCreationAttributes>
    implements FeedbackTwoAttributes
{
    declare id: number;
    declare rater_name: string;
    declare institution_name: InstitutesType;
    declare department_name: string;
    declare designation: string;
    declare somaiya_mail_id: string;
    declare contact_number: string;
    declare teacher_name: string;
    declare nomination_category: string;
    declare q_01: string;
    declare q_02: string;
    declare q_03: string;
    declare q_04: string;
    declare q_05: string;
    declare q_06: string;
    declare q_07: string;
    declare q_08: string;
    declare q_09: string;
    declare nomination_reason: string;
    declare readonly createdAt?: Date;
    declare readonly updatedAt?: Date;
}

export default function FeedbackTwoInit(sequelize: Sequelize) {
    FeedbackTwo.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            rater_name: { type: DataTypes.STRING, allowNull: false },
            institution_name: { type: DataTypes.STRING, allowNull: false },
            department_name: { type: DataTypes.STRING, allowNull: false },
            designation: { type: DataTypes.STRING, allowNull: false },
            somaiya_mail_id: { type: DataTypes.STRING, allowNull: false },
            contact_number: { type: DataTypes.STRING, allowNull: false },
            teacher_name: { type: DataTypes.STRING, allowNull: false },
            nomination_category: { type: DataTypes.STRING, allowNull: false },
            q_01: { type: DataTypes.STRING, allowNull: false },
            q_02: { type: DataTypes.STRING, allowNull: false },
            q_03: { type: DataTypes.STRING, allowNull: false },
            q_04: { type: DataTypes.STRING, allowNull: false },
            q_05: { type: DataTypes.STRING, allowNull: false },
            q_06: { type: DataTypes.STRING, allowNull: false },
            q_07: { type: DataTypes.STRING, allowNull: false },
            q_08: { type: DataTypes.STRING, allowNull: false },
            q_09: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nomination_reason: { type: DataTypes.TEXT, allowNull: false },
        },
        {
            sequelize,
            tableName: "FeedbackTwo",
        }
    );
    return FeedbackTwo;
}
