import z from "zod";
import { arrayChoice, somaiyaMail, validFile, validString } from "@/shared/zod";
import { Institutes, studentAwardList } from "@/shared/constants";
import { clientTextArea } from "@/zod";

export const StudentsFormDataField = {
    email_id: somaiyaMail,
    student_name: validString,
    students_class: validString,
    course: validString,
    institution_name: arrayChoice(Institutes),
    nomination_category: arrayChoice(studentAwardList),
    recommendation_note: clientTextArea({ maxLength: 600 }),
    supportings: validFile({ type: "pdf" }),
};

const StudentsFormDataValidator = z.object(StudentsFormDataField);

export default StudentsFormDataValidator;
