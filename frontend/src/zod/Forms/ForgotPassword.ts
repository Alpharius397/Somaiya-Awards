import z from "zod";
import { anyString, email } from "@/shared/zod";

const ForgotValidator = z.object({
    user_email: email as unknown as z.ZodType,
    user_password_new: anyString as unknown as z.ZodType,
});

export default ForgotValidator;
export type ForgotType = z.infer<typeof ForgotValidator>;

export const ForgotPasswordValidator = z.object({
    user_email_id: email,
});

export type ForgotPasswordType = z.infer<typeof ForgotPasswordValidator>;
