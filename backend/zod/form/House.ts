import z from "zod";
import {
    validBoolean,
    validString,
    arrayChoice,
    validNumber,
} from "@/shared/zod";
import { Houses } from "@/shared/constants";

const HouseForm = z.object({
    house_name: arrayChoice(Houses),

    // Academics (100 points)
    q_01: validNumber,
    q_02: validNumber,
    q_03: validNumber,
    q_04: validNumber,

    // Co-Curricular (100 points)
    q_05: validNumber,
    q_06: validNumber,
    q_07: validNumber,

    // Sports (100 points)
    q_08: validNumber,
    q_09: validNumber,
    q_10: validNumber,

    // Discipline & Behavior (50 points)
    q_11: validNumber,
    q_12: validNumber,

    // Leadership & Initiative (50 points)
    q_13: validNumber,
    q_14: validNumber,

    // Community Service (50 points)
    q_15: validNumber,
    q_16: validNumber,

    // House Spirit / Participation (50 points)
    q_17: validNumber,
    q_18: validNumber,
    proof_docs: validString,
    approved: validBoolean.optional(),
});

export default HouseForm;

export type HouseType = z.infer<typeof HouseForm>;
