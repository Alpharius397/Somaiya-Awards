import FormInfo from "@/components/FormInfo";
import Forms from "@/components/Forms";
import OutstandingInstForm from "@/data/Forms/OutstandingInstForm";
import { OutsInstStages } from "@/components/utils/data";
import OutstandingInstFormValidator from "@/zod/Forms/OutstandingInstForm";
import React from "react";
import SideBar from "@/components/hoi_components/SideBar";

export default function OutstandingInstitution() {
    const message =
        " You may please attach relevant supporting documents in the attachment section at the end of the form. Kindly mention N.A. to the fields not applicable or not relevant. Files should be uploaded in a single PDF Format only. All the relevant documents are to be combined into single pdf.";
    const limit = 12;
    const pageHeaders = [
        "Basic Information",
        "Overall performance improvement",
        "Infrastructure and Facilities",
        "Student Achievements",
        "Faculty Achievements",
        "Institution Culture",
        "Collaborations and tie-ups with other educational institutes both national and International",
        "Participation in Social and Community projects",
        "Alumni involvement in institution activities",
        "Placement Achievement for students",
        "Contribution to intra campus synergy (learning & sharing from other HOIs ,SVV, AV, Nareshwadi, Sakarwadi, Sameerwadi)",
        "Support provided to Trust Administration",
        "Supportings",
    ];

    const info =
        "The objective of this award is to recognize an Institution within Somaiya Vidyavihar, which aligns itself best with the Trusts’ vision of being and working towards becoming a world class teaching and research institution. An institute that is global in the reach of its ideas and universal in its service, and is holistic in its approach and experiential in nature, will be lauded.";

    return (
        <div>
            <div className="flex h-screen">
                <SideBar />
                <div className="h-full overflow-scroll pb-4">
                    <FormInfo info={info} title="Outstanding Institution" />
                    <Forms
                        pageHeadings={pageHeaders}
                        pageCount={limit}
                        data={OutstandingInstForm}
                        stages={OutsInstStages}
                        message={message}
                        validator={OutstandingInstFormValidator}
                    />
                </div>
            </div>
        </div>
    );
}
