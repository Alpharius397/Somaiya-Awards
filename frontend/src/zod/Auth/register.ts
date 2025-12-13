import z from "zod";
import { institute, email, anyString } from "@/shared/zod";
import { Role } from "@/shared/types/role";

/**
 * Email ID, Role,	Institute Name, Password
 */
export const row = z
    .object({
        ["Email ID"]: email,
        Role: z.enum(Role),
        ["Institution Name"]: institute,
        Password: anyString,
    })
    .transform((data) => ({
        user_email_id: data["Email ID"],
        user_institution: data["Institution Name"],
        user_password: data["Password"],
        user_role: data["Role"],
    }));

export const csvReader = z.array(row);

export type RowType = z.infer<typeof row>;
export type csvData = z.infer<typeof csvReader>;
