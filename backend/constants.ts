export const DIR_NAME = __dirname;

export const AccessCookie = "x-access";

export const RefreshCookie = "x-refresh";

export const CsrfName = "x-csrf";

export const LoginCookie = "x-login";

export const instituteHeader = "x-institute-name";

export const applicationHeader = "x-application-id";

export const CSRF =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export const CSRF_SIZE = 32;

export const Groups = {
    "The Somaiya School, Mumbai": [0, 1],
    "S. K. Somaiya Prathmik Shala, Mumbai": [0],
    "S. K. Somaiya Vinay Mandir High School, Mumbai": [0, 1],
    "Somaiya Vidyamandir, Sakarwadi": [0, 1],
    "Shri Sharda English Medium School,  Kopargaon": [0, 1],
    "Somaiya Vidyamandir, Laxmiwadi": [0, 1],
    "Somaiya Vidyamandir,  Laxmiwadi": [0, 1],
    "Somaiya Shishu Niketan Primary School, Sameerwadi": [0],
    "Somaiya Vinaymandir High School, Sameerwadi": [0, 1],
    "K. J. Somaiya English Medium School, Sameerwadi": [0, 1],
    "Nareshwadi Learning Centre, Dahanu": [0],
    "Somaiya Vinay Mandir, Rehti": [0],
    "S. K. Somaiya Vinaymandir Secondary & Junior College": [1],
    "Smt. S. K. Somaiya Junior College of Education": [1],
    "K J Somaiya Madhyamik Vidyalaya, Nareshwadi Learning Centre, Dahanu": [1],
    "K. J. Somaiya Private Industrial Training Institute": [1],
    "K. J. Somaiya Junior College of Science and Commerce": [1],
    "K. J. Somaiya Junior College of Arts and Commerce": [1],
    "K. J. Somaiya Institute of Technology": [2],
    "K. J. Somaiya School of Engineering": [2],
    "K. J. Somaiya Institute of Management": [2],
    "K. J. Somaiya Polytechnic": [2],
    "K. J. Somaiya College Arts and Commerce": [2],
    "K. J. Somaiya Institute of Science and Commerce": [2],
    "S. K. Somaiya Institute of Arts, Science and Commerce": [2],
    "K. J. Somaiya School of Education": [2],
    "K J Somaiya Institute of Dharma Studies": [2],
    "Maya Somaiya School of Music & Performing Arts": [2],
    "Somaiya Institute of Research and Consultancy": [2],
    "Somaiya Sports Academy": [2],
    "Faculty & Staff Development Centre, SVU": [2],
    "School of Civilization Studies": [2],
    "Department of Library and Information Science": [2],
    "Admission and Student Outreach": [2],
    "Dr. Shantilal K Somaiya School of Art": [2],
    "S K Somaiya School of Commerce & Business Studies": [2],
    "Somaiya School of Humanities & Social Sciences": [2],
    "Somaiya School of Basic & Applied Science": [2],
    "Somaiya Dhwani Chitram": [2],
    "K. J. Somaiya Institute of Physiotherapy": [3],
    "K. J. Somaiya School and  Institute  of Nursing": [3],
    "Somaiya School of Design": [2],
    "S. K. Somaiya Balvatika Vidyavihar": [0],
    "Somaiya Vidya Mandir Bhopal Rehti": [0],
    "Somaiya Vidyavihar Trust": [3],
    "Somaiya Vidyavihar University": [3],
    "Research Innovation Incubation Design Labs": [3],
    "Dr. Shantilal K. Somaiya School of Commerce and Business Studies": [2],
    "K. J. Somaiya Medical College": [3],
    "K. J. Somaiya Hospital": [3],
} as const;

export type Group = (typeof Groups)[keyof typeof Groups];
export type InstitutesType = keyof typeof Groups;

export const Institutes = Object.keys(Groups) as InstitutesType[];

export const Houses = [
    "Hemis Snow Leopords",
    "Periyar Elephants",
    "Kaziranga Rhinos",
    "Kanha Tigers",
    "Gir Lions",
] as const;

export const options = ["1", "2", "3", "4", "5"] as const;

export const agreeList = [
    "Strongly Agree",
    "Agree",
    "Sometimes",
    "Disagree",
    "Strongly Disagree",
] as const;

export const ratingList = [
    "Outstanding",
    "Excellent",
    "Good",
    "Average",
    "Poor",
] as const;

export const feedTeacherCategory = [
    "Promising Teacher",
    "Excellence in Teaching",
] as const;

export const NonTeachingAwardList = [
    "Outstanding Employee - Institute (More than 3 years of Service)",
    "Promising Employee - Institute (2 to 3 years of Service)",
    "Outstanding Employee - Somaiya Trust",
    "Outstanding Employee - Somaiya Vidyavihar University",
    "Promising Employee - Somaiya Trust",
    "Promising Employee - Somaiya Vidyavihar University",
    "Outstanding Employee - K. J. Somaiya Hospital",
    "Promising Employee - K. J. Somaiya Hospital",
] as const;

export type NonTeachingAward = (typeof NonTeachingAwardList)[number];

export const OutstandingInstList = [
    "Outstanding School",
    "Outstanding College",
] as const;

export const PeerNonTeachingFeedbackList = [
    "Outstanding Employee Educational Institute",
    "Promising Employee Educational Institute (≤ 3 years of service)",
    "Outstanding Administrator Somaiya Trust/GVPM",
    "Outstanding Employee K. J. Somaiya Hospital & Research Centre",
] as const;

export const studentAwardList = [
    "Somaiya Star -Girl",
    "Somaiya Star -Boy",
    "Somaiya Star Citizen",
    "Somaiya Green Star/ Green Force",
    "Somaiya Star Innovator",
] as const;

export const good = [
    "Outstanding",
    "Very Good",
    "Good",
    "Average",
    "Poor",
] as const;

export const awards = [
    "Excellence in Teaching (more than 3 years of service)",
    "Promising Teacher of the year (2 to 3 years of service)",
] as const;

export const peerTeachingOption = [
    "Promising Teacher",
    "Excellence in Teaching",
] as const;
