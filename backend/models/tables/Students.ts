import { InstitutesType } from "@/shared/constants";
import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface StudentsAttributes {
    id: number;
    email_id: string;
    student_name: string;
    students_class: string;
    course: string;
    institution_name: InstitutesType;
    nomination_category: string;
    recommendation_note: string;
    supportings: string;
    approved: boolean | null;
    createdAt?: Date;
    updatedAt?: Date;
}

interface StudentCreationAttributes extends Optional<
    StudentsAttributes,
    "id" | "createdAt" | "updatedAt"
> {}

export class Students
    extends Model<StudentsAttributes, StudentCreationAttributes>
    implements StudentsAttributes
{
    declare id: number;
    declare email_id: string;
    declare student_name: string;
    declare students_class: string;
    declare course: string;
    declare institution_name: InstitutesType;
    declare nomination_category: string;
    declare recommendation_note: string;
    declare supportings: string;
    declare approved: boolean | null;
    declare readonly createdAt?: Date;
    declare readonly updatedAt?: Date;
}

export default function StudentsInit(sequelize: Sequelize) {
    Students.init(
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
            student_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            students_class: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            course: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            institution_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nomination_category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            recommendation_note: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            supportings: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            approved: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: "Students",
        }
    );
    return Students;
}
