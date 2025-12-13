import UserInit from "@/models/tables/User";
import FeedbackOneInit from "@/models/tables/FeedbackOne";
import FeedbackTwoInit from "@/models/tables/FeedbackTwo";
import FeedbackThreeInit from "@/models/tables/FeedbackThree";
import FeedbackFourInit from "@/models/tables/FeedbackFour";
import FeedbackFiveInit from "@/models/tables/FeedbackFive";
import NonTeachingInit from "@/models/tables/NonTeaching";
import OutstandingInstitutionInit from "@/models/tables/OutstandingInstitution";
import ResearchInit from "@/models/tables/Research";
import ResultsInit from "@/models/tables/Results";
import SportsInit from "@/models/tables/Sports";
import StudentsInit from "@/models/tables/Students";
import TeachingInit from "@/models/tables/Teaching";
import HouseInit from "@/models/tables/House";
import { Sequelize } from "sequelize";

export default function InitDB(sequelize: Sequelize) {
    return {
        User: UserInit(sequelize),
        FeedbackOne: FeedbackOneInit(sequelize),
        FeedbackTwo: FeedbackTwoInit(sequelize),
        FeedbackThree: FeedbackThreeInit(sequelize),
        FeedbackFour: FeedbackFourInit(sequelize),
        FeedbackFive: FeedbackFiveInit(sequelize),
        NonTeaching: NonTeachingInit(sequelize),
        OutstandingInstitution: OutstandingInstitutionInit(sequelize),
        Research: ResearchInit(sequelize),
        Results: ResultsInit(sequelize),
        Sports: SportsInit(sequelize),
        Students: StudentsInit(sequelize),
        Teaching: TeachingInit(sequelize),
        House: HouseInit(sequelize),
    };
}
