import z from "zod";
import { email, validYear, validString, arrayChoice } from "@/shared/zod";
import { good, options } from "@/shared/constants";
import { serverTextArea } from "@/zod";

export const FeedbackOneForm = z.object({
    email_id: email,
    student_batch_year: validYear,
    student_class_and_division: validString,
    teacher_name: validString,
    teacher_designation: validString,
    teaching_subject: validString,
    q_01: arrayChoice(good),
    q_02: arrayChoice(good),
    q_03: arrayChoice(options),
    q_04: arrayChoice(options),
    q_05: arrayChoice(options),
    q_06: arrayChoice(good),
    q_07: arrayChoice(good),
    q_08: arrayChoice(options),
    q_09: arrayChoice(good),
    q_10: arrayChoice(["Yes", "No"]),
    q_11: arrayChoice(good),
    nominating_reasons: serverTextArea({ maxLength: 300 }),
});
