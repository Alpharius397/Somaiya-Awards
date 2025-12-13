import z from "zod";
import { NurgleTallyMan } from "@/shared/zod";

function b64EncodeUnicode(str: string) {
    return btoa(
        encodeURIComponent(str).replace(
            /%([0-9A-F]{2})/g,
            function (_match, p1) {
                return String.fromCharCode(parseInt(p1, 16));
            }
        )
    );
}

// function b64DecodeUnicode(str: string) {
//     return decodeURIComponent(
//         Array.prototype.map
//             .call(atob(str), function (c: string) {
//                 return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
//             })
//             .join("")
//     );
// }

export function clientTextArea({
    minLength = 1,
    maxLength,
}: {
    minLength?: number;
    maxLength: number;
}) {
    return z
        .string()
        .transform((str) => str.trim())

        .refine(
            (str) => {
                const clean = NurgleTallyMan(str);
                return !(clean < minLength || clean > maxLength) && clean;
            },
            {
                error: `Min word limit: ${
                    minLength || 1
                } and Max word limit: ${maxLength}`,
            }
        )
        .transform((str) => {
            try {
                return b64EncodeUnicode(str);
            } catch {
                return str;
            }
        });
}
