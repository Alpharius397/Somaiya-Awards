import z from "zod";
import { arrayChoice, validFile } from "@/shared/zod";
import { options, Houses } from "@/shared/constants";

const HouseEvaluationValidator = z.object({
    house_name: arrayChoice(Houses),
    //
    // Academics (100 points)
    q_01: arrayChoice(options),
    q_02: arrayChoice(options),
    q_03: arrayChoice(options),
    q_04: arrayChoice(options),
    //
    // Co-Curricular (100 points)
    q_05: arrayChoice(options),
    q_06: arrayChoice(options),
    q_07: arrayChoice(options),
    //
    // Sports (100 points)
    q_08: arrayChoice(options),
    q_09: arrayChoice(options),
    q_10: arrayChoice(options),
    //
    // Discipline & Behavior (50 points)
    q_11: arrayChoice(options),
    q_12: arrayChoice(options),
    //
    // Leadership & Initiative (50 points)
    q_13: arrayChoice(options),
    q_14: arrayChoice(options),
    //
    // Community Service (50 points)
    q_15: arrayChoice(options),
    q_16: arrayChoice(options),
    //
    // House Spirit / Participation (50 points)
    q_17: arrayChoice(options),
    q_18: arrayChoice(options),
    proof_docs: validFile({ type: "pdf" }),
});
//
export default HouseEvaluationValidator;
