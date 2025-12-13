import Axios from "@/axios";
import { instituteHeader } from "@/shared/constants";
import { anyString } from "@/shared/zod";
import z from "zod";

const validator = z.object({ data: z.array(anyString) });

export default async function fetchOptions(url: string) {
    const response = await Axios.get(url, {
        headers: {
            [instituteHeader]: localStorage.getItem("institution") as string,
        },
    });
    return (await validator.parseAsync(response.data)).data;
};
