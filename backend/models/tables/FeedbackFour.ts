import { InstitutesType } from "@/shared/constants";
import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface FeedbackFourAttributes {
    id: number;
    rater_name: string;
    institution_name: InstitutesType;
    department: string;
    designation: string;
    somaiya_mail_id: string;
    contact_no: string;
    nominee_name: string;
    category: string;
    q_01: string;
    q_02: string;
    q_03: string;
    q_04: string;
    q_05: string;
    q_06: string;
    q_07: string;
    q_08: string;
    nomination_reason: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface FeedbackFourCreationAttributes extends Optional<
    FeedbackFourAttributes,
    "id" | "createdAt" | "updatedAt"
> {}

export class FeedbackFour
    extends Model<FeedbackFourAttributes, FeedbackFourCreationAttributes>
    implements FeedbackFourAttributes
{
    declare id: number;
    declare rater_name: string;
    declare institution_name: InstitutesType;
    declare department: string;
    declare designation: string;
    declare somaiya_mail_id: string;
    declare contact_no: string;
    declare nominee_name: string;
    declare category: string;
    declare q_01: string;
    declare q_02: string;
    declare q_03: string;
    declare q_04: string;
    declare q_05: string;
    declare q_06: string;
    declare q_07: string;
    declare q_08: string;
    declare nomination_reason: string;
    declare readonly createdAt?: Date;
    declare readonly updatedAt?: Date;
}

export default function FeedbackFourInit(sequelize: Sequelize) {
    FeedbackFour.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            rater_name: { type: DataTypes.STRING, allowNull: false },
            institution_name: { type: DataTypes.STRING, allowNull: false },
            department: { type: DataTypes.STRING, allowNull: false },
            designation: { type: DataTypes.STRING, allowNull: false },
            somaiya_mail_id: { type: DataTypes.STRING, allowNull: false },
            contact_no: { type: DataTypes.STRING, allowNull: false },
            nominee_name: { type: DataTypes.STRING, allowNull: false },
            category: { type: DataTypes.STRING, allowNull: false },
            q_01: { type: DataTypes.STRING, allowNull: false },
            q_02: { type: DataTypes.STRING, allowNull: false },
            q_03: { type: DataTypes.STRING, allowNull: false },
            q_04: { type: DataTypes.STRING, allowNull: false },
            q_05: { type: DataTypes.STRING, allowNull: false },
            q_06: { type: DataTypes.STRING, allowNull: false },
            q_07: { type: DataTypes.STRING, allowNull: false },
            q_08: { type: DataTypes.STRING, allowNull: false },
            nomination_reason: { type: DataTypes.TEXT, allowNull: false },
        },
        {
            sequelize,
            tableName: "FeedbackFour",
        }
    );
    return FeedbackFour;
}
