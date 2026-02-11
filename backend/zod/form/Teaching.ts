import z from "zod";
import {
    arrayChoice,
    email,
    institute,
    lastDate,
    phoneNumber,
    somaiyaMail,
    validBoolean,
    validNumber,
    validString,
} from "@/shared/zod";
import { awards } from "@/shared/constants";
import { serverTextArea } from "@/zod";

export const TeachingValidator = {
    email_id: email,
    faculty_name: validString,
    awards_category: arrayChoice(awards),
    institution_name: institute,
    department: validString,
    designation: validString,
    date_of_appointment: lastDate(2), // Remember, its always greater than or equal to 2
    somaiya_mail_id: somaiyaMail,
    contact_number: phoneNumber,
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
    q_21: serverTextArea({ maxLength: 300 }),
    profile_photograph: validString,
    data_evidence: validString,

    ieacApproved: validBoolean.optional().nullable(),
    ieacApprovedFile: validString.optional().nullable(),
    ieac_scoreA: validNumber.optional().nullable(),
    ieac_scoreB: validNumber.optional().nullable(),
    ieac_scoreC: validNumber.optional().nullable(),
    hr_approved: validBoolean.optional().nullable(),
};
export const TeachingForm = z.object(TeachingValidator);

export type TeachingType = z.infer<typeof TeachingForm>;
