import FormInfo from "@/components/FormInfo";
import Forms from "@/components/Forms";
import FeedbackTeachingPeerForm from "@/data/Forms/FeedbackTeachingPeerForm";
import { FeedbackPeerTeaching } from "@/components/utils/data";
import Footer from "@/components/Footer";
import React from "react";
import FeedbackTeachingPeerValidator from "@/zod/Forms/FeedbackTeachingPeerForm";
import Navbar from "@/components/Navbar";


export default function FeedbackTeachingPR() {
    const headings = ["Basic Information", "Nominee Ratings", "Review"];
    const limit = headings.length - 1;
    const aboutForm =
        "The peers' feedback form for teaching enables colleagues to provide valuable insights on teaching effectiveness. This form fosters collaboration, encourages professional growth, and promotes a culture of continuous improvement. By collecting feedback from peers, teaching staff gain valuable perspectives to refine their teaching approaches and enhance the learning experience for students.";


    return (
        <div>
            <Navbar />
            <div className="h-full overflow-scroll pb-4">
                <FormInfo
                    title="Peers Feedback Form for Teaching"
                    info={aboutForm}
                />

                <Forms
                    pageHeadings={headings}
                    pageCount={limit}
                    data={FeedbackTeachingPeerForm}
                    validator={FeedbackTeachingPeerValidator}
                    stages={FeedbackPeerTeaching}
                />

                <div className="mt-[5rem]">
                    <Footer />
                </div>
            </div>
        </div>
    );
}
