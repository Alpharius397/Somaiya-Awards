import z from "zod";
import { validString } from "@/shared/zod";

export const ResultsForm = z.object({
    result: validString,
});

export type ResultsType = z.infer<typeof ResultsForm>;
