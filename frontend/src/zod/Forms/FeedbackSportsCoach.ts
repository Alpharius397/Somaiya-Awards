import z from "zod";
import { validString, somaiyaMail, institute, arrayChoice } from "@/shared/zod";

import { options } from "@/shared/constants";

export const FeedbackSportsCoachField = {
    rater_name: validString,

    somaiya_mail_id: somaiyaMail,

    institution_name: institute,

    nominee_name: validString,

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
};

const FeedbackSportsCoachValidator = z.object(FeedbackSportsCoachField);

export default FeedbackSportsCoachValidator;
