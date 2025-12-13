import z from "zod";
import {
    arrayChoice,
    email,
    phoneNumber,
    somaiyaMail,
    validDate,
    validFile,
    validString,
    validYear,
} from "@/shared/zod";
import { Institutes, OutstandingInstList } from "@/shared/constants";
import { clientTextArea } from "@/zod";

export const OutstandingInstFormField = {
    email_id: email,
    nomination_category: arrayChoice(OutstandingInstList),
    institution_name: arrayChoice(Institutes),
    established_In: validYear,
    head_of_institution: validString,
    hoi_designation: validString,
    hoi_joining_date: validDate,
    somaiya_mail_id: somaiyaMail,
    contact_number: phoneNumber,
    q_01: clientTextArea({ maxLength: 500 }),

    q_02: clientTextArea({ maxLength: 500 }),

    q_03: clientTextArea({ maxLength: 500 }),

    q_04: clientTextArea({ maxLength: 500 }),

    q_05: clientTextArea({ maxLength: 500 }),

    q_06: clientTextArea({ maxLength: 500 }),

    q_07: clientTextArea({ maxLength: 250 }),

    q_08: clientTextArea({ maxLength: 500 }),

    q_09: clientTextArea({ maxLength: 500 }),

    q_10: clientTextArea({ maxLength: 500 }),

    q_11: clientTextArea({ maxLength: 500 }),

    q_12: clientTextArea({ maxLength: 250 }),

    q_13: clientTextArea({ maxLength: 750 }),

    q_14: clientTextArea({ maxLength: 750 }),

    q_15: clientTextArea({ maxLength: 500 }),

    q_16: clientTextArea({ maxLength: 500 }),

    q_17: clientTextArea({ maxLength: 500 }),

    institution_ratings: arrayChoice(["1", "2", "3", "4", "5"]),

    q_18: clientTextArea({ maxLength: 1000 }),

    q_19: clientTextArea({ maxLength: 300 }),

    q_20: clientTextArea({ maxLength: 500 }),

    q_21: clientTextArea({ maxLength: 750 }),

    q_22: clientTextArea({ maxLength: 500 }),

    q_23: clientTextArea({ maxLength: 1000 }),

    q_24: clientTextArea({ maxLength: 500 }),

    q_25: clientTextArea({ maxLength: 500 }),

    q_26: clientTextArea({ maxLength: 500 }),

    q_27: clientTextArea({ maxLength: 500 }),

    q_28: clientTextArea({ maxLength: 500 }),

    q_29: clientTextArea({ maxLength: 500 }),

    q_30: clientTextArea({ maxLength: 500 }),

    q_31: clientTextArea({ maxLength: 500 }),

    q_32: clientTextArea({ maxLength: 500 }),

    q_33: clientTextArea({ maxLength: 300 }),

    q_34: clientTextArea({ maxLength: 300 }),

    q_35: clientTextArea({ maxLength: 300 }),

    q_36: clientTextArea({ maxLength: 300 }),

    q_37: clientTextArea({ maxLength: 300 }),

    q_38: clientTextArea({ maxLength: 500 }),

    supportings: validFile({ type: "pdf" }),
};
const OutstandingInstFormValidator = z.object(OutstandingInstFormField);

export default OutstandingInstFormValidator;
