import z from "zod";
import { validBoolean, validNumber, validNumberRange } from "@/shared/zod";

export const teachingIEACScore = z.object({
    ieac_scoreA: validNumberRange(1, 10),
    ieac_scoreB: validNumberRange(1, 10),
    ieac_scoreC: validNumberRange(1, 10),
    ieacApproved: validBoolean.optional().nullable(),
    applicationID: validNumber.optional().nullable(),
});

export type TeachingIEACScoreType = z.infer<typeof teachingIEACScore>;
