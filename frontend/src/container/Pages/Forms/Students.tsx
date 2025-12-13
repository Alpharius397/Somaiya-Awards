import Forms from "@/components/Forms";
import StudentsFormData from "@/data/Forms/StudentsFormData";
import { StudentsFormStages } from "@/components/utils/data";
import FormInfo from "@/components/FormInfo";
import React from "react";
import StudentsFormDataValidator from "@/zod/Forms/StudentsFormData";
import SideBar from "@/components/hoi_components/SideBar";

export default function Students() {
    /**
     * Form Info
     */
    const awardInfo =
        "Student awards recognize and honor exceptional efforts, fostering confidence and motivation. They inspire goal-setting and excellence. Awards validate hard work, encouraging healthy competition and ambition. They reinforce positive behaviors, positively impacting personal and academic growth.";

    /**
     * Forms Body
     */

    const pageHeaders = [
        "Basic Information",
        "Reasons",
        "Supporting Documents",
    ];

    const limit = 2;
    const message =
        "Please upload supporting documents at the end of the form. Files should be uploaded in a single PDF Format only. All the relevant documents are to be combined into single pdf.";

    return (
        <div>
            <div className="flex h-screen">
                <SideBar />
                <div className="h-full overflow-scroll pb-4">
                    <FormInfo title="Students Awards" info={awardInfo} />
                    <Forms
                        pageHeadings={pageHeaders}
                        pageCount={limit}
                        data={StudentsFormData}
                        stages={StudentsFormStages}
                        message={message}
                        validator={StudentsFormDataValidator}
                    />
                </div>
            </div>
        </div>
    );
}
