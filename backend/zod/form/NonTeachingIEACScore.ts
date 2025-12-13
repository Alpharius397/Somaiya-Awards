import z from "zod";
import { validBoolean, validNumber, validNumberRange } from "@/shared/zod";

export const nonTeachingIEACScore = z.object({
    ieac_scoreA: validNumberRange(1, 10),
    ieac_scoreB: validNumberRange(1, 10),
    ieacApproved: validBoolean.optional().nullable(),
    applicationID: validNumber.optional().nullable(),
});

export type NonTeachingIEACScoreType = z.infer<typeof nonTeachingIEACScore>;
