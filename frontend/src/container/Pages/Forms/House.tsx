import SideBar from "@/components/hoi_components/SideBar";
import FormInfo from "@/components/FormInfo";
import Forms from "@/components/Forms";
import HouseEvaluationForm from "@/data/Forms/HouseForm";
import { HouseEvaluationStage } from "@/components/utils/data";
import React from "react";
import HouseEvaluationValidator from "@/zod/Forms/HouseForm";

export default function HouseEvaluation() {
    /**
     * data
     */
    const title = "House Evaluation Form";
    const award_info =
        "The House Evaluation Form is designed to assess the overall performance of each house across multiple dimensions including academics, co-curricular activities, sports, discipline, leadership, community service, and house spirit. The evaluation ensures a holistic judgment of the house's contribution and achievements towards the institution’s values and goals.";

    const message =
        "Please score each parameter on a scale of 1 – 5, with 1 being the lowest score and 5 being the highest. Ensure fair judgment based on observations and supporting evidence. Files should be uploaded in a single PDF Format only. All the relevant documents are to be combined into single pdf.";

    const headings = [
        "Select House",
        "Academics (Out of 100)",
        "Co-Curricular (Out of 100)",
        "Sports (Out of 100)",
        "Discipline & Behavior (Out of 50)",
        "Leadership & Initiative (Out of 50)",
        "Community Service (Out of 50)",
        "House Spirit / Participation (Out of 50)",
        "Supporting Documents",
    ];

    const limit = headings.length - 1;

    return (
        <div>
            <div className="flex h-screen">
                <SideBar />
                <div className="h-full overflow-scroll pb-4">
                    <FormInfo title={title} info={award_info} />
                    <Forms
                        pageHeadings={headings}
                        pageCount={limit}
                        data={HouseEvaluationForm}
                        stages={HouseEvaluationStage}
                        message={message}
                        validator={HouseEvaluationValidator}
                    />
                </div>
            </div>
        </div>
    );
}
