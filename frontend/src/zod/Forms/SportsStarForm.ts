import z from "zod";
import { arrayChoice, email, validFile, validString } from "@/shared/zod";
import { options, Institutes } from "@/shared/constants";
import { clientTextArea } from "@/zod";

export const SportsStarFormField = {
    email_id: email,

    institution_name: arrayChoice(Institutes),

    nominee_inspiring_coach: validString,

    nominee_coach_comments: clientTextArea({ maxLength: 500 }),

    nominee_coach_photo: validFile({ type: "jpg" }),

    nominee_coach_supportings: validFile({ type: "pdf" }),

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

    nominee_ss_girl: validString,

    nominee_ss_girl_sport: validString,

    nominee_ss_girl_photo: validFile({ type: "jpg" }),

    nominee_ss_girl_supportings: validFile({ type: "pdf" }),

    q_21: arrayChoice(options),

    q_22: arrayChoice(options),

    q_23: arrayChoice(options),

    q_24: arrayChoice(options),

    nominee_ss_boy: validString,

    nominee_ss_boy_sport: validString,

    nominee_ss_boy_photo: validFile({ type: "jpg" }),

    nominee_ss_boy_supportings: validFile({ type: "pdf" }),

    q_25: arrayChoice(options),

    q_26: arrayChoice(options),

    q_27: arrayChoice(options),

    q_28: arrayChoice(options),
};
const SportsStarFormValidator = z.object(SportsStarFormField);

export default SportsStarFormValidator;
