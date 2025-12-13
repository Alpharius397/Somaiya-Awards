import z from "zod";
import {
    arrayChoice,
    phoneNumber,
    somaiyaMail,
    validString,
} from "@/shared/zod";
import { agreeList, PeerNonTeachingFeedbackList } from "@/shared/constants";
import { serverTextArea } from "@/zod";

export const FeedbackFourForm = z.object({
    rater_name: validString,

    institution_name: validString,

    department: validString,

    designation: validString,

    somaiya_mail_id: somaiyaMail,

    contact_no: phoneNumber,

    nominee_name: validString,

    category: arrayChoice(PeerNonTeachingFeedbackList),

    q_01: arrayChoice(agreeList),

    q_02: arrayChoice(agreeList),

    q_03: arrayChoice(["Outstanding", "Excellent", "Good", "Average", "Poor"]),

    q_04: arrayChoice(agreeList),

    q_05: arrayChoice(agreeList),

    q_06: arrayChoice(agreeList),

    q_07: arrayChoice(agreeList),

    q_08: arrayChoice(agreeList),

    nomination_reason: serverTextArea({ maxLength: 300 }),
});

export type FeedbackFourType = z.infer<typeof FeedbackFourForm>;
