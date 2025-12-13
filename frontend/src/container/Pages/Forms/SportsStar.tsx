import FormInfo from "@/components/FormInfo";
import Forms from "@/components/Forms";
import SportsStarForm from "@/data/Forms/SportsStarForm";
import { SportsStarStages } from "@/components/utils/data";
import React from "react";
import SportsStarFormValidator from "@/zod/Forms/SportsStarForm";
import SideBar from "@/components/hoi_components/SideBar";

export default function SportsStar() {
    /***
     * Data
     */

    const titleOfAward = "Somaiya Sports Star Awards";
    const awardInfo = `The Foundation Day celebration of our organization is when we celebrate, encourage and honour our trusted faculty members, proactive staff members and enthusiastic students who together strive to make Somaiya Vidyavihar an ideal knowledge eco-system. The Human Resources team have been organizing annually the Awards under four categories (Faculty, Staff, Students, Research & Institution) This form is specific to the award category- SPORTS category`;

    const limit = 7;
    const headings = [
        "Basic Information",
        "Nominee Inspiring P.E Teacher",
        "Assesment Of Competencies (PART A)",
        "Assesment Of Compitencies (PART B)",
        "Nominee Sports Star - Girl",
        "Nominee Ratings (GIRL)",
        "Nominee Sports Star - Boy",
        "Nominee Ratings (BOY)",
    ];
    const message =
        "Please fill all the fields correctly as per your knowledge. Upload a single file under each field. Files should be uploaded in a single PDF Format only. All the relevant documents are to be combined into single pdf.";

    return (
        <div>
            <div className="flex h-screen">
                <SideBar />
                <div className="h-full overflow-scroll pb-4">
                    <FormInfo title={titleOfAward} info={awardInfo} />

                    {/* form instructions  */}

                    <div className="mt-4 font-Poppins text-xs">
                        <div className="bg-red-700 text-white rounded-md shadow-lg mx-[1.5%] w-[50%] p-5 mt-16 ml-8">
                            <div className="px-5 py-1">
                                <p className="font-semibold">
                                    A total of 3 Sports Awards to be given away
                                    to Employees
                                </p>
                                <ol className="list-decimal list-inside mx-5 mt-3">
                                    <li>Inspiring Sports Incharge- Schools</li>
                                    <li>
                                        Inspiring Sports Incharge- Higher
                                        Education Institutes
                                    </li>
                                    <li>
                                        Inspiring Sports Incharge- Somaiya
                                        Sports Academy
                                    </li>
                                </ol>
                            </div>

                            <div className="px-5 py-2">
                                <p className="font-semibold">
                                    A total of 4 Sports Stars Awards to be given
                                    to outstanding student athletes
                                </p>
                                <ol className="list-decimal list-inside mx-5 mt-3">
                                    <li>Somaiya Sports Star (Girl)- Schools</li>
                                    <li>Somaiya Sports Star (Boy)- Schools</li>
                                    <li>
                                        Somaiya Sports Star (Girl)- Higher
                                        Education Institutes
                                    </li>
                                    <li>
                                        Somaiya Sports Star (Boy)- Higher
                                        Education Institutes
                                    </li>
                                </ol>
                            </div>

                            <div className="my-2 px-5">
                                <p className="mb-3">
                                    Please nominate inspiring PE / Sports
                                    Incharge and outstanding sports stars from
                                    your respective institute and upload the
                                    supporting PDF file duly filled in.
                                </p>
                                <a
                                    href="https://drive.google.com/drive/folders/1c0GFTgMr4ssbjAhWt-FzBeorHXHDDbOx"
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-white font-bold underline text-base "
                                >
                                    Link to HandBook
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Forms section  */}

                    <Forms
                        pageHeadings={headings}
                        pageCount={limit}
                        data={SportsStarForm}
                        stages={SportsStarStages}
                        message={message}
                        validator={SportsStarFormValidator}
                    />
                </div>
            </div>
        </div>
    );
}
