import { NurgleTallyMan } from "@/shared/zod";
import z from "zod";

export function serverTextArea({
    minLength = 1,
    maxLength,
}: {
    minLength?: number;
    maxLength: number;
}) {
    return z
        .string()
        .transform((str) => str.trim())
        .transform((str) => {
            try {
                return Buffer.from(str, "base64").toString("utf-8");
            } catch (err) {
                return str;
            }
        })
        .refine(
            (str) => {
                let clean = NurgleTallyMan(str);
                return !(clean < minLength || clean > maxLength) && clean;
            },
            {
                error: `Min word limit: ${minLength} and Max word limit: ${maxLength}`,
            }
        );
}
