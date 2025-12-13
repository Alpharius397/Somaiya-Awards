import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { Role } from "@/shared/types/role";

interface UserAttributes {
    id: number;
    email_id: string;
    institution: string | null;
    password: string;
    role: Role | null;
    createdAt?: Date;
    updatedAt?: Date;
}

interface UserCreationAttributes
    extends Optional<
        UserAttributes,
        "id" | "createdAt" | "updatedAt" | "institution" | "role"
    > {}

export class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
{
    declare id: number;
    declare email_id: string;
    declare institution: string | null;
    declare password: string;
    declare role: Role | null;
    declare readonly createdAt?: Date;
    declare readonly updatedAt?: Date;
}

export default function UserInit(sequelize: Sequelize) {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            email_id: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: true,
                    isEmail: true,
                },
            },
            institution: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM(
                    Role.Admin,
                    Role.Hoi,
                    Role.Ieac,
                    Role.Peer,
                    Role.ResearchAdmin,
                    Role.SportsAdmin,
                    Role.Student,
                    Role.StudentAdmin
                ),
            },
        },
        {
            sequelize,
            modelName: "User",
        }
    );

    return User;
}
