import FormInfo from "@/components/FormInfo";
import Forms from "@/components/Forms";
import ResearchForm from "@/data/Forms/ResearchForm";
import { ResearchFormStages } from "@/components/utils/data";
import React from "react";
import ResearchFormValidator from "@/zod/Forms/ResearchForm";
import SideBar from "@/components/hoi_components/SideBar";

export default function Research() {
    /**
     * Data
     */
    const title = "Dr. S.K. Somaiya Award (Excellence In Research)";
    const awardInfo = `Dr. S. K. Somaiya Award (Excellence in Research) is a one-time research excellence award intending to recognize and honor faculty for 'her/he/their outstanding research achievements in terms of original and review publications, granted research projects, consultancy services, and intellectual assets thus contributing to our vibrant research ecosystem. The winners will be awarded in the Research Excellence Award category during the Foundation Day celebration.`;

    const limit = 6;
    const headings = [
        "Faculty Affiliation Details",
        "Research Publications",
        "Research Meetings",
        "Research Projects",
        "Intellectual Property",
        "Research Awards",
        "UnderTaking and Evidence",
    ];

    const message = `Specify the number here and details to be provided in the document.
  Kindly adhere to the instruction provided in the 'Specific Note' under the Research
  Meetings head in the document template. Files should be uploaded in a single PDF Format only. All the relevant documents are to be combined into single pdf.`;

    return (
        <div>
            <div className="flex h-screen">
                <SideBar />
                <div className="h-full overflow-scroll pb-4">
                    <FormInfo title={title} info={awardInfo} />
                    <Forms
                        pageCount={limit}
                        pageHeadings={headings}
                        data={ResearchForm}
                        stages={ResearchFormStages}
                        message={message}
                        validator={ResearchFormValidator}
                    />
                </div>
            </div>
        </div>
    );
}
