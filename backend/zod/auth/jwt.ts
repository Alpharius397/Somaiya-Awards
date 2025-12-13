import * as z from "zod";
import { email, role, validNumber, validString } from "@/shared/zod";

export const JwtForm = z.object({
    id: validNumber,
    email_id: email,
    institution: validString.optional().nullable(),
    role: role.optional().nullable(),
});

export type JwtType = z.infer<typeof JwtForm>;
