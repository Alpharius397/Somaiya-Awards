import z from "zod";
import { arrayChoice, email, validYear, validString } from "@/shared/zod";
import { agreeList } from "@/shared/constants";
import { clientTextArea } from "@/zod";

export const StudentNonTeachingFeedbackFormField = {
    email_id: email,

    student_batch_year: validYear,

    student_class_and_division: validString,

    employee_name: validString,

    employee_designation: validString,

    q_01: arrayChoice(agreeList),

    q_02: arrayChoice(agreeList),

    q_03: arrayChoice(agreeList),

    q_04: arrayChoice(agreeList),

    q_05: arrayChoice(agreeList),

    nomination_reason: clientTextArea({ maxLength: 300 }),
};
const StudentNonTeachingFeedbackFormValidator = z.object(
    StudentNonTeachingFeedbackFormField
);

export default StudentNonTeachingFeedbackFormValidator;
