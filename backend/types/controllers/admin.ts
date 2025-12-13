import z from "zod";
import { validBoolean, validNumber, validString } from "@/shared/zod";
import { OutstandingInstitution } from "@/models/tables/OutstandingInstitution";
import { Research } from "@/models/tables/Research";
import { Results } from "@/models/tables/Results";
import { User } from "@/models/tables/User";
import { Sports } from "@/models/tables/Sports";
import { Teaching } from "@/models/tables/Teaching";
import { NonTeaching } from "@/models/tables/NonTeaching";
import { Students } from "@/models/tables/Students";
import { FeedbackOne } from "@/models/tables/FeedbackOne";
import { FeedbackTwo } from "@/models/tables/FeedbackTwo";
import { FeedbackThree } from "@/models/tables/FeedbackThree";
import { FeedbackFour } from "@/models/tables/FeedbackFour";
import { FeedbackFive } from "@/models/tables/FeedbackFive";

export const countAllResponse = z.object({
    institutionFormCount: validNumber,
    researchFormCount: validNumber,
    sportsFormCount: validNumber,
    teachingFormCount: validNumber,
    nonTeachingFormCount: validNumber,
    feedbackOneFormCount: validNumber,
    feedbackTwoFormCount: validNumber,
    feedbackThreeFormCount: validNumber,
    feedbackFourFormCount: validNumber,
    studentsFormCount: validNumber,
});

export type countAll = z.infer<typeof countAllResponse>;

export const lastDayResponse = z.record(validString, validNumber);
export type lastDay = z.infer<typeof lastDayResponse>;

export const instituteCount = z.record(
    validString,
    z.object({
        id: validString,
        institution_form: validNumber,
        research_form: validNumber,
        sports_form: validNumber,
        teaching_form: validNumber,
        non_teaching_form: validNumber,
        institution_name: validString,
        students_form: validNumber,
    })
);

export interface instituteCountType {
    institution_name?: string;
    institution_form?: number;
    research_form?: number;
    sports_form?: number;
    teaching_form?: number;
    non_teaching_form?: number;
    students_form?: number;
}

export const instituteCountArray = z.object({
    data: z.array(
        z.object({
            id: validString,
            institution_form: validNumber,
            research_form: validNumber,
            sports_form: validNumber,
            teaching_form: validNumber,
            non_teaching_form: validNumber,
            institution_name: validString,
            students_form: validNumber,
        })
    ),
});

export type instituteCountArrayType = z.infer<typeof instituteCountArray>;

export type lastDate = {
    date: string;
    formsFilled: number;
};

export type TeachingJuryScore = {
    id?: number;
    faculty_name?: string;
    institution_name?: string;
    designation?: string;
    groups?: number[];
    applicationScore?: number;
    feedbackScore?: number;
    ieacApprovedFile?: string | null;
    totalScore?: number;
};

export type NonTeachingJuryScore = {
    id?: number;
    staff_name?: string;
    institution_name?: string;
    designation?: string;
    groups?: number[];
    applicationScore?: number;
    feedbackScore?: number;
    ieacApprovedFile?: string | null;
    totalScore?: number;
};

export type InstituteCount = {
    institution_name: string;
    formsFilled: number;
};

export const groupCount = z.object({
    data: z.array(
        z.object({
            group: z.enum(["A", "B", "C", "D", "E"]),
            formsFilled: validNumber,
        })
    ),
});

export type groupCountType = z.infer<typeof groupCount>;

export const getInstitutionData = z.object({
    data: z.array(z.instanceof(OutstandingInstitution)),
});

export type getInstitutionType = z.infer<typeof getInstitutionData>;

export const getResultData = z.object({
    data: z.array(z.instanceof(Results)),
});

export const getUserData = z.object({
    data: z.array(z.instanceof(User)),
});

export const getSportsData = z.object({
    data: z.array(z.instanceof(Sports)),
});

export const getTeachingData = z.object({
    data: z.array(z.instanceof(Teaching)),
});

export const getFeedbackOneData = z.object({
    data: z.array(z.instanceof(FeedbackOne)),
});

export const getFeedbackTwoData = z.object({
    data: z.array(z.instanceof(FeedbackTwo)),
});

export const getFeedbackThreeData = z.object({
    data: z.array(z.instanceof(FeedbackThree)),
});

export const getFeedbackFourData = z.object({
    data: z.array(z.instanceof(FeedbackFour)),
});

export const getFeedbackFiveData = z.object({
    data: z.array(z.instanceof(FeedbackFive)),
});

export type MyModel =
    | OutstandingInstitution
    | Research
    | Sports
    | Students
    | Teaching
    | NonTeaching;

export const SportsGirl = z.object({
    data: z.array(
        z.object({
            id: validNumber,
            email_id: validString,
            institution_name: validString,
            nominee_ss_girl: validString,
            nominee_ss_girl_sport: validString,
            nominee_ss_girl_photo: validString,
            nominee_ss_girl_supportings: validString,
            isApprovedSportsGirl: validBoolean,
            q_21: validNumber,
            q_22: validNumber,
            q_23: validNumber,
            q_24: validNumber,
            final_score: validNumber,
        })
    ),
});

export type SportsGirlType = z.infer<typeof SportsGirl>;

export const SportsBoy = z.object({
    data: z.array(
        z.object({
            id: validNumber,
            email_id: validString,
            institution_name: validString,
            nominee_ss_boy: validString,
            nominee_ss_boy_sport: validString,
            nominee_ss_boy_photo: validString,
            nominee_ss_boy_supportings: validString,
            isApprovedSportsBoy: validBoolean,
            q_25: validNumber,
            q_26: validNumber,
            q_27: validNumber,
            q_28: validNumber,
            final_score: validNumber,
        })
    ),
});

export type SportsBoyType = z.infer<typeof SportsBoy>;

export const Coach = z.object({
    data: z.array(
        z.object({
            id: validNumber,
            email_id: validString,
            institution_name: validString,
            nominee_inspiring_coach: validString,
            nominee_coach_comments: validString,
            nominee_coach_photo: validString,
            nominee_coach_supportings: validString,
            isApprovedCoach: validBoolean,
            q_01: validNumber,
            q_02: validNumber,
            q_03: validNumber,
            q_04: validNumber,
            q_05: validNumber,
            q_06: validNumber,
            q_07: validNumber,
            q_08: validNumber,
            q_09: validNumber,
            q_10: validNumber,
            q_11: validNumber,
            q_12: validNumber,
            q_13: validNumber,
            q_14: validNumber,
            q_15: validNumber,
            q_16: validNumber,
            q_17: validNumber,
            q_18: validNumber,
            q_19: validNumber,
            q_20: validNumber,
            final_score: validNumber,
        })
    ),
});

export type CoachType = z.infer<typeof Coach>;

export const TeachingScore = z.object({
    name: validString,
    category: validString,
    institute: validString,
    scoreA: validNumber,
    scoreB: validNumber,
    scoreC: validNumber,
    hoi_avg: validNumber,
    ieac_avg: validNumber,
    student_avg: validNumber,
    peers_avg: validNumber,
});

export const NonTeachingScore = z.object({
    name: validString,
    category: validString,
    institute: validString,
    scoreA: validNumber,
    scoreB: validNumber,
    hoi_avg: validNumber,
    ieac_avg: validNumber,
    student_avg: validNumber,
    peers_avg: validNumber,
});

