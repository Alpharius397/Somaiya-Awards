import { InstitutesType } from "@/shared/constants";
import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface ResearchAttributes {
    id: number;
    faculty_name: string;
    designation: string;
    institution_name: InstitutesType;
    department: string;
    tenure: string;
    org_articles_count: number;
    review_papers_count: number;
    letters_count: number;
    case_studies_count: number;
    books_count: number;
    chapters_count: number;
    presentations_international_count: number;
    presentation_national_count: number;
    international_seminar_count: number;
    national_seminar_count: number;
    international_workshops_count: number;
    national_workshops_count: number;
    completed_minorp_count: number;
    ongoing_minorp_count: number;
    completed_majorp_count: number;
    ongoing_majorp_count: number;
    completed_consultancy_count: number;
    ongoing_consultancy_count: number;
    revenue_from_projects: number;
    granted_patents_count: number;
    filed_patents_count: number;
    granted_copyrights_count: number;
    filed_copyrights_count: number;
    granted_industrial_designs_count: number;
    filed_industrial_designs_count: number;
    international_awards_won_count: number;
    national_awards_won_count: number;
    evidence_of_research: string;
    evidence_of_data_provided: string;
    confirmation_of_trueData: string | null;
    approved: boolean | null;
    createdAt?: Date;
    updatedAt?: Date;
}

interface ResearchCreationAttributes extends Optional<
    ResearchAttributes,
    "id" | "createdAt" | "updatedAt"
> {}

export class Research
    extends Model<ResearchAttributes, ResearchCreationAttributes>
    implements ResearchAttributes
{
    declare id: number;
    declare faculty_name: string;
    declare designation: string;
    declare institution_name: InstitutesType;
    declare department: string;
    declare tenure: string;
    declare org_articles_count: number;
    declare review_papers_count: number;
    declare letters_count: number;
    declare case_studies_count: number;
    declare books_count: number;
    declare chapters_count: number;
    declare presentations_international_count: number;
    declare presentation_national_count: number;
    declare international_seminar_count: number;
    declare national_seminar_count: number;
    declare international_workshops_count: number;
    declare national_workshops_count: number;
    declare completed_minorp_count: number;
    declare ongoing_minorp_count: number;
    declare completed_majorp_count: number;
    declare ongoing_majorp_count: number;
    declare completed_consultancy_count: number;
    declare ongoing_consultancy_count: number;
    declare revenue_from_projects: number;
    declare granted_patents_count: number;
    declare filed_patents_count: number;
    declare granted_copyrights_count: number;
    declare filed_copyrights_count: number;
    declare granted_industrial_designs_count: number;
    declare filed_industrial_designs_count: number;
    declare international_awards_won_count: number;
    declare national_awards_won_count: number;
    declare evidence_of_research: string;
    declare evidence_of_data_provided: string;
    declare confirmation_of_trueData: string | null;
    declare approved: boolean | null;
    declare readonly createdAt?: Date;
    declare readonly updatedAt?: Date;
}

export default function ResearchInit(sequelize: Sequelize) {
    Research.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            faculty_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            designation: {
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
            tenure: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            org_articles_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            review_papers_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            letters_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            case_studies_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            books_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            chapters_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            presentations_international_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            presentation_national_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            international_seminar_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            national_seminar_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            international_workshops_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            national_workshops_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            completed_minorp_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            ongoing_minorp_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            completed_majorp_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            ongoing_majorp_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            completed_consultancy_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            ongoing_consultancy_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            revenue_from_projects: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            granted_patents_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            filed_patents_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            granted_copyrights_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            filed_copyrights_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            granted_industrial_designs_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            filed_industrial_designs_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            international_awards_won_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            national_awards_won_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            evidence_of_research: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            evidence_of_data_provided: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            confirmation_of_trueData: {
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
            modelName: "Research",
        }
    );
    return Research;
}
