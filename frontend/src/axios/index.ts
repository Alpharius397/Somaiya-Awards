import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { anyString, validString } from "@/shared/zod";
import { CsrfName } from "@/shared/constants";
import { LOCAL_DEVELOPMENT } from "@/constants";

let url: string;

if (LOCAL_DEVELOPMENT && !import.meta.env.PROD) {
    url = "http://localhost:5001";
} else {
    url = "https://apisomaiyaawards.somaiya.edu";
}

export const BASE_URL = url;

export const DATA_URL = `${BASE_URL}/data` as const;

interface Config extends AxiosRequestConfig {
    retry?: boolean;
}

export const URL = {
    AUTH: {
        LOGIN: `${BASE_URL}/auth/login` as const,
        LOGOUT: `${BASE_URL}/auth/logout` as const,
        FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password` as const,
        REFRESH: `${BASE_URL}/auth/refresh` as const,
        OTP_RESET: (id: string, token: string) => {
            const validId = anyString.parse(id);
            const validToken = anyString.parse(token);
            return `${BASE_URL}/auth/${validId}/${validToken}` as const;
        },
        VALIDATE: `${BASE_URL}/auth/validate` as const,
        REGISTER: `${BASE_URL}/auth/register` as const,
        BULK_CREATE: `${BASE_URL}/auth/bulk-create` as const,
    },

    ADMIN: {
        COUNT: {
            ALL: `${BASE_URL}/admin/data/count/all` as const,
            LAST_15: `${BASE_URL}/admin/data/count/15` as const,
            INSTITUTION_WISE:
                `${BASE_URL}/admin/data/count/institution-wise` as const,
            GROUPS: `${BASE_URL}/admin/data/count/group` as const,
        },
        USERS_LIST: `${BASE_URL}/admin/data/users` as const,
        FORMS: {
            SPORTS_COACH: `${BASE_URL}/admin/data/forms/sports-coach` as const,
            STUDENTS: `${BASE_URL}/admin/data/forms/students` as const,
            SPORTS_GIRL: `${BASE_URL}/admin/data/forms/sports-girl` as const,
            SPORTS_BOY: `${BASE_URL}/admin/data/forms/sports-boy` as const,
            NON_TEACHING: `${BASE_URL}/admin/data/forms/non-teaching` as const,
            OUTSTANDING_INSTITUTION:
                `${BASE_URL}/admin/data/forms/outstanding-institution` as const,
            FEEDBACK_01: `${BASE_URL}/admin/data/forms/feedback-01` as const,
            RESEARCH: `${BASE_URL}/admin/data/forms/research` as const,
            TEACHING: `${BASE_URL}/admin/data/forms/teaching` as const,
            FEEDBACK_02: `${BASE_URL}/admin/data/forms/feedback-02` as const,
            FEEDBACK_03: `${BASE_URL}/admin/data/forms/feedback-03` as const,
            FEEDBACK_04: `${BASE_URL}/admin/data/forms/feedback-04` as const,
        },
        RESULTS_HANDLER: `${BASE_URL}/admin/data/announce-results` as const,
        FORM_PREVIEW: (formType: string) => {
            const validForm = validString.parse(formType);
            return `${BASE_URL}/admin/data/${validForm}/preview` as const;
        },
        JURY_SUMMARY: {
            TEACHING: `${BASE_URL}/admin/data/jury-summary/teaching` as const,
            NON_TEACHING:
                `${BASE_URL}/admin/data/jury-summary/non-teaching` as const,
        },
        SCORECARD: {
            TEACHING: `${BASE_URL}/admin/data/teaching/scorecard` as const,
            NON_TEACHING:
                `${BASE_URL}/admin/data/non-teaching/scorecard` as const,
        },
        RESULTS: `${BASE_URL}/admin/data/results` as const,
        DELETE_USER: `${BASE_URL}/admin/data/delete-user` as const,
    },

    FORMS: {
        SPORTS: `${BASE_URL}/forms/sports` as const,
        TEACHING: `${BASE_URL}/forms/teaching` as const,
        STUDENTS: `${BASE_URL}/forms/students` as const,
        RESEARCH: `${BASE_URL}/forms/research` as const,
        NON_TEACHING: `${BASE_URL}/forms/non-teaching` as const,
        OUTSTANDING_INSTITUTION:
            `${BASE_URL}/forms/outstanding-institution` as const,
        FEEDBACK_01: `${BASE_URL}/forms/feedback-01` as const,
        FEEDBACK_02: `${BASE_URL}/forms/feedback-02` as const,
        FEEDBACK_03: `${BASE_URL}/forms/feedback-03` as const,
        FEEDBACK_04: `${BASE_URL}/forms/feedback-04` as const,
        FEEDBACK_05: `${BASE_URL}/forms/feedback-05` as const,
    },

    HOI: {
        STUDENTS: `${BASE_URL}/hoi/data/students` as const,
        NON_TEACHING: `${BASE_URL}/hoi/data/non-teaching` as const,
        SPORTS: `${BASE_URL}/hoi/data/sports` as const,
        TEACHING: `${BASE_URL}/hoi/data/teaching` as const,
        RESEARCH: `${BASE_URL}/hoi/data/research` as const,
        OUTSTANDING_INSTITUTION:
            `${BASE_URL}/hoi/data/outstanding-institution` as const,
    },

    IEAC: {
        OUTSTANDING_INSTITUTION:
            `${BASE_URL}/ieac/data/outstanding-institution` as const,
        NOMINATED_STAFF: `${BASE_URL}/ieac/data/nominated-staff-names` as const,
        TEACHING: `${BASE_URL}/ieac/data/teaching` as const,
        NON_TEACHING: `${BASE_URL}/ieac/data/non-teaching` as const,
        NOMINATED_FACULTY:
            `${BASE_URL}/ieac/data/nominated-faculty-names` as const,
    },

    RESEARCH_ADMIN: {
        UPDATE: `${BASE_URL}/research-data/data/update` as const,
        RESEARCH: `${BASE_URL}/research-data/data/research` as const,
    },

    SPORTS_ADMIN: {
        INSPIRING_COACH:
            `${BASE_URL}/sports-admin/data/inspiring-coach` as const,
        NOMINATED_COACH:
            `${BASE_URL}/sports-admin/data/nominated-coach-names` as const,
        SPORTS_STAR_BOY:
            `${BASE_URL}/sports-admin/data/sports-star-boy` as const,
        SPORTS_STAR_GIRL:
            `${BASE_URL}/sports-admin/data/sports-star-girl` as const,
        UPDATE: `${BASE_URL}/sports-admin/data/update` as const,
    },

    STUDENTS_ADMIN: {
        STAR_CITIZEN:
            `${BASE_URL}/students-admin/data/somaiya-star-citizen` as const,
        GREEN_STAR:
            `${BASE_URL}/students-admin/data/somaiya-green-star` as const,
        STAR_INNOVATOR:
            `${BASE_URL}/students-admin/data/somaiya-star-innovator` as const,
        UPDATE: `${BASE_URL}/students-admin/data/update` as const,
        STAR_BOY: `${BASE_URL}/students-admin/data/somaiya-star-boy` as const,
        STAR_GIRL: `${BASE_URL}/students-admin/data/somaiya-star-girl` as const,
    },
};

const Axios = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Request-Origin": BASE_URL,
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

Axios.interceptors.request.use(async (config) => {
    const token = localStorage.getItem(CsrfName);

    if (token !== null && config.headers) {
        config.headers[CsrfName] = token;
    }

    return config;
});

Axios.interceptors.response.use(
    (response) => {
        const header = response.headers;
        if (header[CsrfName]) localStorage.setItem(CsrfName, header[CsrfName]);
        return response;
    },

    async (error: AxiosError) => {
        const config = error.config as Config;

        if (!config) return Promise.reject(error);

        if (config.retry) {
            return Promise.reject(error);
        }

        config.retry = true;

        try {
            await axios.post(
                URL.AUTH.REFRESH,
                {},
                {
                    headers: {
                        "Request-Origin": BASE_URL,
                        "Content-Type": "application/json",
                        [CsrfName]: localStorage.getItem(CsrfName) || "",
                    },
                    withCredentials: true,
                }
            );

            return Axios(config);
        } catch (err) {
            return Promise.reject(err);
        }
    }
);

function strip(value: string) {
    const regex = new RegExp(/^[/]+|[/]+$/, "g");
    return value.replace(regex, "");
}

export function generateLink(value: string | null | undefined) {
    return value ? `${BASE_URL}/${strip(value)}` : undefined;
}

export default Axios;
