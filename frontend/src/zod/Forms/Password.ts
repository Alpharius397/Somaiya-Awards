import z from "zod";
import { role, validString, anyString, email } from "@/shared/zod";

const PasswordValid = z.object({
    user_password: anyString,
    user_role: role,
    user_institution: validString.optional(),
    user_email_id: email,
});

export default PasswordValid;
export type PasswordType = z.infer<typeof PasswordValid>;
