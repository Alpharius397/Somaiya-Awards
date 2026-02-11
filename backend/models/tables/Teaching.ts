import { InstitutesType } from "@/shared/constants";
import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface TeachingAttributes {
    id: number;
    email_id: string;
    faculty_name: string;
    awards_category: string;
    institution_name: InstitutesType;
    department: string;
    designation: string;
    date_of_appointment: Date;
    somaiya_mail_id: string;
    contact_number: string;
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
    q_21: string;
    data_evidence: string;
    profile_photograph: string;
    ieacApproved: boolean | null;
    hr_approved: boolean | null;
    ieacApprovedFile: string | null;
    ieac_scoreA: number | null;
    ieac_scoreB: number | null;
    ieac_scoreC: number | null;
    createdAt?: Date;
    updatedAt?: Date;
}

interface TeachingCreationAttributes extends Optional<
    TeachingAttributes,
    | "id"
    | "createdAt"
    | "updatedAt"
    | "ieac_scoreA"
    | "ieac_scoreB"
    | "ieac_scoreC"
    | "ieacApprovedFile"
> {}

export class Teaching
    extends Model<TeachingAttributes, TeachingCreationAttributes>
    implements TeachingAttributes
{
    declare id: number;
    declare email_id: string;
    declare faculty_name: string;
    declare awards_category: string;
    declare institution_name: InstitutesType;
    declare department: string;
    declare designation: string;
    declare date_of_appointment: Date;
    declare somaiya_mail_id: string;
    declare contact_number: string;
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
    declare q_21: string;
    declare data_evidence: string;
    declare profile_photograph: string;
    declare ieacApproved: boolean | null;
    declare hr_approved: boolean | null;
    declare ieacApprovedFile: string | null;
    declare ieac_scoreA: number | null;
    declare ieac_scoreB: number | null;
    declare ieac_scoreC: number | null;
    declare readonly createdAt?: Date;
    declare readonly updatedAt?: Date;
}

export default function TeachingInit(sequelize: Sequelize) {
    Teaching.init(
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
            faculty_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            awards_category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            institution_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            department: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            designation: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            date_of_appointment: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            somaiya_mail_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            contact_number: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            q_01: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            q_02: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            q_03: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            q_04: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            q_05: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            q_06: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            q_07: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            q_08: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            q_09: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            q_10: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            q_11: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            q_12: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            q_13: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            q_14: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            q_15: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            q_16: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            q_17: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            q_18: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            q_19: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            q_20: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            q_21: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            data_evidence: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            profile_photograph: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ieacApproved: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            ieacApprovedFile: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            ieac_scoreA: {
                type: DataTypes.DECIMAL(10, 5),
                allowNull: true,
            },
            ieac_scoreB: {
                type: DataTypes.DECIMAL(10, 5),
                allowNull: true,
            },
            ieac_scoreC: {
                type: DataTypes.DECIMAL(10, 5),
                allowNull: true,
            },
            hr_approved: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: "Teaching",
        }
    );
    return Teaching;
}
