export type GirlData = {
    id: number;
    email_id: string;
    institute_name: string;
    nominee_ss_girl: string;
    nominee_ss_girl_sport: string;
    nominee_ss_girl_photo: string;
    nominee_ss_girl_supportings: string;
    isApprovedSportsGirl: boolean;
    q_21: number;
    q_22: number;
    q_23: number;
    q_24: number;
    final_score: number;
};

export type BoyData = {
    id: number;
    email_id: string;
    institute_name: string;
    nominee_ss_boy: string;
    nominee_ss_boy_sport: string;
    nominee_ss_boy_photo: string;
    nominee_ss_boy_supportings: string;
    isApprovedSportsBoy: boolean;
    q_25: number;
    q_26: number;
    q_27: number;
    q_28: number;
    final_score: number;
};

export type CoachData = {
    id: number;
    email_id: string;
    institute_name: string;
    nominee_inspiring_coach: string;
    nominee_coach_comments: string;
    nominee_coach_photo: string;
    nominee_coach_supportings: string;
    isApprovedCoach: boolean;
    q_01: number;
    q_02: number;
    q_03: number;
    q_04: number;
    q_05: number;
    q_06: number;
    q_07: number;
    q_08: number;
    q_09: number;
    q_10: number;
    q_11: number;
    q_12: number;
    q_13: number;
    q_14: number;
    q_15: number;
    q_16: number;
    q_17: number;
    q_18: number;
    q_19: number;
    q_20: number;
    final_score: number;
};

export type SportsExcelType<T extends GirlData | BoyData | CoachData> = {
    OK: T[];
    NO: T[];
};
