import { InstitutesType } from "@/shared/constants";
import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface OutstandingInstitutionAttributes {
    id: number;
    email_id: string;
    nomination_category: string;
    institution_name: InstitutesType;
    established_In: string;
    head_of_institution: string;
    hoi_designation: string;
    hoi_joining_date: Date;
    somaiya_mail_id: string;
    contact_number: string;
    q_01: string;
    q_02: string;
    q_03: string;
    q_04: string;
    q_05: string;
    q_06: string;
    q_07: string;
    q_08: string;
    q_09: string;
    q_10: string;
    q_11: string;
    q_12: string;
    q_13: string;
    q_14: string;
    q_15: string;
    q_16: string;
    q_17: string;
    institution_ratings: number;
    q_18: string;
    q_19: string;
    q_20: string;
    q_21: string;
    q_22: string;
    q_23: string;
    q_24: string;
    q_25: string;
    q_26: string;
    q_27: string;
    q_28: string;
    q_29: string;
    q_30: string;
    q_31: string;
    q_32: string;
    q_33: string;
    q_34: string;
    q_35: string;
    q_36: string;
    q_37: string;
    q_38: string;
    supportings: string;
    ieac_approved: boolean | null;
    hr_approved: boolean | null;
    createdAt?: Date;
    updatedAt?: Date;
}

interface OutstandingInstitutionCreationAttributes extends Optional<
    OutstandingInstitutionAttributes,
    "id" | "createdAt" | "updatedAt"
> {}

export class OutstandingInstitution
    extends Model<
        OutstandingInstitutionAttributes,
        OutstandingInstitutionCreationAttributes
    >
    implements OutstandingInstitutionAttributes
{
    declare id: number;
    declare email_id: string;
    declare nomination_category: string;
    declare institution_name: InstitutesType;
    declare established_In: string;
    declare head_of_institution: string;
    declare hoi_designation: string;
    declare hoi_joining_date: Date;
    declare somaiya_mail_id: string;
    declare contact_number: string;
    declare q_01: string;
    declare q_02: string;
    declare q_03: string;
    declare q_04: string;
    declare q_05: string;
    declare q_06: string;
    declare q_07: string;
    declare q_08: string;
    declare q_09: string;
    declare q_10: string;
    declare q_11: string;
    declare q_12: string;
    declare q_13: string;
    declare q_14: string;
    declare q_15: string;
    declare q_16: string;
    declare q_17: string;
    declare institution_ratings: number;
    declare q_18: string;
    declare q_19: string;
    declare q_20: string;
    declare q_21: string;
    declare q_22: string;
    declare q_23: string;
    declare q_24: string;
    declare q_25: string;
    declare q_26: string;
    declare q_27: string;
    declare q_28: string;
    declare q_29: string;
    declare q_30: string;
    declare q_31: string;
    declare q_32: string;
    declare q_33: string;
    declare q_34: string;
    declare q_35: string;
    declare q_36: string;
    declare q_37: string;
    declare q_38: string;
    declare supportings: string;
    declare ieac_approved: boolean | null;
    declare hr_approved: boolean | null;
    declare readonly createdAt?: Date;
    declare readonly updatedAt?: Date;
}

export default function OutstandingInstitutionInit(sequelize: Sequelize) {
    OutstandingInstitution.init(
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
            nomination_category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            institution_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            established_In: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            head_of_institution: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            hoi_designation: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            hoi_joining_date: {
                type: DataTypes.DATEONLY,
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
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_02: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_03: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_04: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_05: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_06: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_07: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_08: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_09: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_10: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_11: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_12: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_13: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_14: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_15: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_16: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_17: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            institution_ratings: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            q_18: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_19: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_20: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_21: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_22: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_23: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_24: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_25: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_26: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_27: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_28: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_29: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_30: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_31: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_32: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_33: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_34: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_35: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_36: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_37: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            q_38: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            supportings: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ieac_approved: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            hr_approved: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: "OutstandingInstitution",
        }
    );
    return OutstandingInstitution;
}
