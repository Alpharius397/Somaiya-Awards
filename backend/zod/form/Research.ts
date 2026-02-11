import z from "zod";
import {
    institute,
    validBoolean,
    validNumber,
    validString,
} from "@/shared/zod";

export const ResearchForm = z.object({
    faculty_name: validString,
    designation: validString,
    institution_name: institute,
    department: validString,
    tenure: validString,
    org_articles_count: validNumber,
    review_papers_count: validNumber,
    letters_count: validNumber,
    case_studies_count: validNumber,
    books_count: validNumber,
    chapters_count: validNumber,
    presentations_international_count: validNumber,
    presentation_national_count: validNumber,
    international_seminar_count: validNumber,
    national_seminar_count: validNumber,
    international_workshops_count: validNumber,
    national_workshops_count: validNumber,
    completed_minorp_count: validNumber,
    ongoing_minorp_count: validNumber,
    completed_majorp_count: validNumber,
    ongoing_majorp_count: validNumber,
    completed_consultancy_count: validNumber,
    ongoing_consultancy_count: validNumber,
    revenue_from_projects: validNumber,
    granted_patents_count: validNumber,
    filed_patents_count: validNumber,
    granted_copyrights_count: validNumber,
    filed_copyrights_count: validNumber,
    granted_industrial_designs_count: validNumber,
    filed_industrial_designs_count: validNumber,
    international_awards_won_count: validNumber,
    national_awards_won_count: validNumber,
    evidence_of_research: validString,
    evidence_of_data_provided: validString,

    confirmation_of_trueData: validString.optional().nullable(),
    approved: validBoolean.optional().nullable(),
});

export type ResearchType = z.infer<typeof ResearchForm>;
