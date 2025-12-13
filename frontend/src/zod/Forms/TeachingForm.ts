import {
    validString,
    email,
    arrayChoice,
    somaiyaMail,
    phoneNumber,
    validFile,
    lastDate,
} from "@/shared/zod";

import { awards, Institutes } from "@/shared/constants";
import z from "zod";
import { options } from "@/shared/constants";
import { clientTextArea } from "@/zod";

export const TeachingFormField = {
    email_id: email,

    faculty_name: validString,

    awards_category: arrayChoice(awards),

    institution_name: arrayChoice(Institutes),

    department: validString,

    designation: validString,

    date_of_appointment: lastDate(2),

    somaiya_mail_id: somaiyaMail,

    contact_number: phoneNumber,

    q_01: arrayChoice(options),

    q_02: arrayChoice(options),

    q_03: arrayChoice(options),

    q_04: arrayChoice(options),

    q_05: arrayChoice(options),

    q_06: arrayChoice(options),

    q_07: arrayChoice(options),

    q_08: arrayChoice(options),

    q_09: arrayChoice(options),

    q_10: arrayChoice(options),

    q_11: arrayChoice(options),

    q_12: arrayChoice(options),

    q_13: arrayChoice(options),

    q_14: arrayChoice(options),

    q_15: arrayChoice(options),

    q_16: arrayChoice(options),

    q_17: arrayChoice(options),

    q_18: arrayChoice(options),

    q_19: arrayChoice(options),

    q_20: arrayChoice(options),

    q_21: clientTextArea({ maxLength: 300 }),

    data_evidence: validFile({ type: "pdf" }),

    profile_photograph: validFile({ type: "jpg" }),
};
const TeachingFormValidator = z.object(TeachingFormField);

export default TeachingFormValidator;