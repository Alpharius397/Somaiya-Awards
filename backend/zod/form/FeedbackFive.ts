import z from "zod";
import { institute, somaiyaMail, validNumber, validString } from "@/shared/zod";

export const FeedbackFiveForm = z.object({
    rater_name: validString,
    somaiya_mail_id: somaiyaMail,
    institution_name: institute,
    nominee_name: validString,
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
});

export type FeedbackFiveType = z.infer<typeof FeedbackFiveForm>;
