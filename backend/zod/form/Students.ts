import z from "zod";
import {
    arrayChoice,
    institute,
    somaiyaMail,
    validBoolean,
    validString,
} from "@/shared/zod";
import { studentAwardList } from "@/shared/constants";
import { serverTextArea } from "@/zod";

export const StudentsForm = z.object({
    email_id: somaiyaMail,
    student_name: validString,
    students_class: validString,
    course: validString,
    institution_name: institute,
    nomination_category: arrayChoice(studentAwardList),
    recommendation_note: serverTextArea({ maxLength: 600 }),
    supportings: validString,

    approved: validBoolean.optional().nullable(),
});

export type StudentsType = z.infer<typeof StudentsForm>;
