import z from "zod";
import {
    arrayChoice,
    email,
    institute,
    lastDate,
    phoneNumber,
    somaiyaMail,
    validFile,
    validString,
} from "@/shared/zod";
import { NonTeachingAwardList, options } from "@/shared/constants";

export const NonTeachingField = {
    email_id: email,
    staff_name: validString,
    award_category: arrayChoice(NonTeachingAwardList),
    institution_name: institute,
    department: validString,
    designation: validString,
    appointment_date: lastDate(2),
    somaiya_email_id: somaiyaMail,
    phone_number: phoneNumber,
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
    q_21: arrayChoice(options),
    q_22: arrayChoice(options),
    q_23: arrayChoice(options),
    q_24: arrayChoice(options),
    proof_docs: validFile({ type: "pdf" }),
    nominee_photograph: validFile({ type: "jpg" }),
};
const NonTeachingValidator = z.object(NonTeachingField);

export default NonTeachingValidator;
