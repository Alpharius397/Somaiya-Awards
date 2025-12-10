import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import FormCard from "@/components/utils/FormCard";
import HandleLogout from "@/container/Pages/Logout";
import React from "react";

function FormCards() {
    const logout = HandleLogout();

    return (
        <div className="p-5 w-full h-screen ">
            {/* Headers  */}
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col">
                    <div className="text-xl font-Poppins font-semibold">
                        <h2> Forms</h2>
                    </div>
                    <div className="my-1">
                        <p className="text-md font-Poppins">
                            Forms are shown as per eligibility criteria of
                            Institutions
                        </p>
                    </div>
                </div>
                <div className="flex flex-col text-center">
                    <div onClick={logout} className="p-3 cursor-pointer ">
                        <LogoutRoundedIcon />
                    </div>
                    <div className="text-md font-Poppins">Logout</div>
                </div>
            </div>

            {/* Cards  */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-[5rem]  pb-[5rem] mt-[5rem] place-items-center">
                <div className="">
                    <FormCard
                        image={"/institution.jpeg"}
                        title="Outstanding Institution"
                        info="Celebrating excellence, impact, and remarkable achievements of outstanding institutions."
                        link="/forms/outstanding-institution"
                    />
                </div>
                <div>
                    <FormCard
                        image={"/sports.jpeg"}
                        title="Sports"
                        info="Award form for sports: Honoring excellence in athletic achievements worldwide"
                        link="/forms/sports"
                    />
                </div>
                {
                    // group.includes(3) || group.includes(4)
                    //     ?
                    <>
                        <div>
                            <FormCard
                                image={"/research.jpeg"}
                                title="Excellence in Research"
                                info="Honoring excellence in research through prestigious and impactful awards."
                                link="/forms/research"
                            />
                        </div>
                    </>
                    // :
                    // null
                }
                <div>
                    <FormCard
                        image={"/teaching.jpeg"}
                        title="Teaching"
                        info="Recognizing teaching excellence with prestigious awards to inspiring educators"
                        link="/forms/teaching"
                    />
                </div>
                <div>
                    <FormCard
                        image={"/non-teaching.jpeg"}
                        title="Non Teaching"
                        info="Commending administrative and staff excellence, driving institutional success and growth."
                        link="/forms/non-teaching"
                    />
                </div>

                <div>
                    <FormCard
                        image={"/students.png"}
                        title="Students"
                        info="Honoring students for their academic and overall achievements"
                        link="/forms/students"
                    />
                </div>
                {/* <div>
                    <FormCard
                        image={"/house.png"}
                        title="House"
                        info="Recognizing houses for their all-round performance and contributions"
                        link="/forms/house"
                    />
                </div> */}
            </div>
        </div>
    );
}

export default React.memo(FormCards);