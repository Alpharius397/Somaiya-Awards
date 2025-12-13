

export type NonTeachingJuryScore = {
    id?: number;
    staff_name?: string;
    institution_name?: string;
    designation?: string;
    groups?: number[];
    applicationScore?: number;
    feedbackScore?: number;
    ieacApprovedFile?: string | null;
    totalScore?: number;
};

export type NonTeachingJuryData = {
    [K in
        | "OEI_3"
        | "PEI_23"
        | "OEST"
        | "OESVU"
        | "PEST"
        | "PESVU"
        | "OESH"
        | "PESH"]: {
        OK: NonTeachingJuryScore[];
        NO: NonTeachingJuryScore[];
    };
};
