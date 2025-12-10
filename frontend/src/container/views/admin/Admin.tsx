import { useEffect, useState } from "react";
import SideBar from "@/components/SideBar";
import Box from "@/components/status components/Box";
import LineGraph from "@/components/status components/LineGraph";
import Datagrid from "@/components/status components/Datagrid";
import PieChart from "@/components/status components/PieChart";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Axios from "@/axios";
import React from "react";
import HandleLogout from "@/container/Pages/Logout";

const Admin = () => {
    const logout = HandleLogout();

    const [pastData, setPastData] = useState<{ [key: string]: number }>({});
    const [rows, setRows] = useState<
        {
            [key: string]: [];
        }[]
    >([]);
    const [pieData, setPieData] = useState<[]>([]);
    const [counts, setCounts] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        // first load all data
        loadDashboardData();
    }, []);

    const loadDashboardData = () => {
        // all Counts
        Axios.get("/admin/data/count/all", {}).then((res) => {
            setCounts(res.data.data || []);
        });

        // 15 days Count
        Axios.get("/admin/data/count/15").then((res) => {
            setPastData(res.data.data || []);
        });

        // institution Wise count
        Axios.get("/admin/data/count/institution-wise", {}).then((res) => {
            setRows(res.data.data || []);
        });

        // group Wise count

        Axios.get("/admin/data/count/group", {}).then((res) => {
            setPieData(res.data.data || []);
        });
    };

    return (
        <div className="adminPage">
            <div className="flex h-screen text-white font-Poppins">
                <SideBar />
                <div className="flex p-3  flex-col w-full overflow-y-scroll">
                    <div className="p-2 flex flex-row items-center justify-between">
                        <div className="w-[70%]">
                            <div className="text-black font-Roboto text-2xl ">
                                DashBoard
                            </div>
                            <div className="text-black  ">
                                Welcome to your Dashboard
                            </div>
                        </div>
                        <div className="text-black">
                            <div
                                onClick={logout}
                                className="flex flex-col cursor-pointer text-center justify-center"
                            >
                                <div>
                                    <LogoutRoundedIcon />
                                </div>
                                Logout
                            </div>
                        </div>
                    </div>

                    {/* flex div containing boxes and graph  */}
                    <div className="flex flex-row p-2 text-black justify-between">
                        {/* count section  */}
                        <div className="flex flex-row w-[30%]">
                            <div>
                                <Box
                                    title="Research Forms"
                                    count={
                                        counts
                                            ? counts.researchFormCount || 0
                                            : 0
                                    }
                                />
                                <Box
                                    title="Non Teaching Forms"
                                    count={
                                        counts
                                            ? counts.nonTeachingFormCount || 0
                                            : 0
                                    }
                                />
                            </div>
                            <div>
                                <Box
                                    title="Teaching Forms"
                                    count={
                                        counts
                                            ? counts.teachingFormCount || 0
                                            : 0
                                    }
                                />
                                <Box
                                    title="Total Forms Filled"
                                    count={
                                        (counts
                                            ? counts.institutionFormCount || 0
                                            : 0) +
                                            (counts
                                                ? counts.researchFormCount || 0
                                                : 0) +
                                            (counts
                                                ? counts.sportsFormCount || 0
                                                : 0) +
                                            (counts
                                                ? counts.teachingFormCount || 0
                                                : 0) +
                                            (counts
                                                ? counts.nonTeachingFormCount ||
                                                  0
                                                : 0) +
                                            (counts
                                                ? counts.feedbackOneFormCount ||
                                                  0
                                                : 0) +
                                            (counts
                                                ? counts.feedbackTwoFormCount ||
                                                  0
                                                : 0) +
                                            (counts
                                                ? counts.feedbackThreeFormCount ||
                                                  0
                                                : 0) +
                                            (counts
                                                ? counts.feedbackFourFormCount ||
                                                  0
                                                : 0) +
                                            (counts
                                                ? counts.studentsFormCount
                                                : 0) || 0
                                    }
                                />
                            </div>
                        </div>

                        {/* graph section  */}
                        <div className="w-[70%]">
                            <LineGraph data={pastData} />
                        </div>
                    </div>

                    {/* flex row containing table and piechart  */}
                    <div className="flex flex-row text-black p-5 h-full">
                        <div className="w-[70%] custom-scroll bg-[#FFFAFA] rounded-lg p-4 overflow-y-scroll">
                            <Datagrid rows={rows} />
                        </div>
                        <div className="w-[30%]">
                            <PieChart data={pieData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
