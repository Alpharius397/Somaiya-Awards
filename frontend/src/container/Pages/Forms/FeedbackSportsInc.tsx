import FormInfo from "@/components/FormInfo";
import Forms from "@/components/Forms";
import { FeedbackSportsCoach } from "@/components/utils/data";
import FeedbackSportsForm from "@/data/Forms/FeedbackSportsCoach";
import Footer from "@/components/Footer";
import FeedbackSportsCoachValidator from "@/zod/Forms/FeedbackSportsCoach";
import Navbar from "@/components/Navbar";
import React from "react";

export default function FeedbackSportsInc() {
    const headings = [
        "Basic Details",
        "Feedback and Review",
        "Feedback and Review",
    ];
    const limit = headings.length - 1;

    const aboutForm =
        "Students have provided valuable feedback on their sports instructor and coach, which will be considered for award nominations. Their comments reflect a strong sense of appreciation for the instructor's dedication, effective teaching methods, and the coach's ability to inspire and lead the team. These insights underscore the positive impact these mentors have had on their athletic journeys and overall development.";

    return (
        <div>
            <Navbar />
            <div className="h-full overflow-scroll pb-4">
                <FormInfo
                    title="Feedback Form: Sports Incharge/ Coach"
                    info={aboutForm}
                />

                <Forms
                    pageHeadings={headings}
                    pageCount={limit}
                    data={FeedbackSportsForm}
                    stages={FeedbackSportsCoach}
                    validator={FeedbackSportsCoachValidator}
                />

                <div className="mt-[5rem]">
                    <Footer />
                </div>
            </div>
        </div>
    );
}
