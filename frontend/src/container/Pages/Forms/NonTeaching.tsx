import FormInfo from "@/components/FormInfo";
import Forms from "@/components/Forms";
import NonTeachingForm from "@/data/Forms/NonTeachingForm";
import { NonTeachingFormStages } from "@/components/utils/data";
import NonTeachingValidator from "@/zod/Forms/NonTeachingForm";
import React from "react";
import SideBar from "@/components/hoi_components/SideBar";

export default function NonTeaching() {
    /**
     * Data
     */
    const title = `Non Teaching Awards Application Form`;
    const awards_info = `The Foundation Day celebration of our organization is when we celebrate, encourage and honour
  our trusted faculty members, proactive staff members and enthusiastic students who together strive
  to make Somaiya Vidyavihar an ideal knowledge eco-system.
  The Human Resources team have been organizing annually the Awards under four categories
  (Faculty, Staff, Students, Research & Institution)
  This form is specific to the award category- Staff members
  `;

    const headings = [
        "Basic Information",
        "Does the candidate determine service excellence in overall work performance?",
        "Has the candidate contributed to enhance the image of the department or the institute?",
        "Does the candidate promote high morale through a pleasant, supportive attitude and by providing services to others?",
        "Does the candidate take any initiative and show creativity resulting in improved operating efficiency of the department / Institute?",
        " Does the candidate put forth an effort to improve self as well as to develop and recognize others?",
        "Part B",
        "Supportings",
    ];
    const limit = headings.length - 1;
    const message = `Please score the candidate on a scale of 1 – 5 on the below points, with 1
  being the lowest score and 5 the highest. Files should be uploaded in a single PDF Format only. All the relevant documents are to be combined into single pdf.`;
    return (
        <div>
            <div className="flex h-screen">
                <SideBar />
                <div className="h-full overflow-scroll pb-4">
                    <FormInfo title={title} info={awards_info} />
                    <Forms
                        pageHeadings={headings}
                        pageCount={limit}
                        message={message}
                        data={NonTeachingForm}
                        stages={NonTeachingFormStages}
                        validator={NonTeachingValidator}
                    />
                </div>
            </div>
        </div>
    );
}
