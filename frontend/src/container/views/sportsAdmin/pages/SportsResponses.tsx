import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SideBar from "@/container/views/sportsAdmin/components/Sidebar";
import xlsx from "json-as-xlsx";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import {
    columns01,
    columns02,
    columns03,
} from "@/data/AnalysisData/SPORTS ADMIN/structure";
import Axios from "@/axios";
import React from "react";
import {
    xlsxSportsBoy,
    xlsxSportsCoach,
    xlsxSportsGirl,
} from "@/container/Pages/View Pages/xlsxColumns";
import {
    BoyData,
    CoachData,
    GirlData,
    SportsExcelType,
} from "@/shared/types/controllers/sports";

export default function SportsResponses() {
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState<GridColDef[]>([]);
    const [title, setTitle] = useState<string>();

    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname.split("/responses/")[1];
    const name = path.replaceAll("-", " ");

    useEffect(() => {
        switch (path) {
            case "sports-star-girl":
                setColumns(columns01);
                break;

            case "sports-star-boy":
                setColumns(columns02);
                break;

            case "inspiring-coach":
                setColumns(columns03);
                break;

            default:
                navigate("/sports-admin");
        }

        const url = `/sports-admin/data/${path}`;

        Axios.get(url)
            .then((res) => {
                setRows(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });

        setTitle(name);
    }, [name, navigate, path]);

    const handleReportDownload = () => {
        const path = location.pathname.split("/responses/")[1];
        /** Well well how the turn tables */
        Axios.get(`/sports-admin/data/sportsexcel/${path}`)
            .then((res) => {
                if (path === "sports-star-girl") {
                    const content: SportsExcelType<GirlData> = res.data;
                    const data = [
                        {
                            sheet: "Approved Sports Star Girl",
                            columns: xlsxSportsGirl,
                            content: content.OK,
                        },
                        {
                            sheet: "Not Approved Sports Star Girl",
                            columns: xlsxSportsGirl,
                            content: content.NO,
                        },
                    ];

                    const settings = {
                        fileName: "Sports Star Girl Summary",
                        extraLength: 3,
                        writeMode: "writeFile",
                        writeOptions: {},
                        RTL: false,
                    };

                    xlsx(data, settings);
                } else if (path === "sports-star-boy") {
                    const content: SportsExcelType<BoyData> = res.data;
                    const data = [
                        {
                            sheet: "Approved Sports Star Boy",
                            columns: xlsxSportsBoy,
                            content: content.OK,
                        },
                        {
                            sheet: "Not Approved Sports Star Boy",
                            columns: xlsxSportsBoy,
                            content: content.NO,
                        },
                    ];

                    const settings = {
                        fileName: "Sports Star Boy Summary",
                        extraLength: 3,
                        writeMode: "writeFile",
                        writeOptions: {},
                        RTL: false,
                    };

                    xlsx(data, settings);
                } else if (path === "inspiring-coach") {
                    const content: SportsExcelType<CoachData> = res.data;
                    const data = [
                        {
                            sheet: "Approved Inspiring Coach",
                            columns: xlsxSportsCoach,
                            content: content.OK,
                        },
                        {
                            sheet: "Not Approved Inspiring Coach",
                            columns: xlsxSportsCoach,
                            content: content.NO,
                        },
                    ];

                    const settings = {
                        fileName: "Sports Star Coach Summary",
                        extraLength: 3,
                        writeMode: "writeFile",
                        writeOptions: {},
                        RTL: false,
                    };

                    xlsx(data, settings);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className="flex">
            <SideBar />
            <div className="flex flex-col w-full h-screen overflow-y-scroll">
                <div className="p-5">
                    <div>
                        <h2 className="text-xl font-Poppins font-semibold capitalize">
                            {title}
                        </h2>
                    </div>
                    {[
                        "inspiring-coach",
                        "sports-star-boy",
                        "sports-star-girl",
                    ].includes(
                        location.pathname.split("/responses/")[1] || ""
                    ) ? (
                        <div className="">
                            <button
                                onClick={handleReportDownload}
                                className="px-3 py-2 bg-red-800 text-white font-Poppins my-5 rounded-full"
                            >
                                Download Summary
                            </button>
                        </div>
                    ) : null}

                    <div className="my-5">
                        <DataGrid
                            columns={columns}
                            rows={rows}
                            density="comfortable"
                            slots={{
                                toolbar: GridToolbar,
                            }}
                            slotProps={{
                                toolbar: {
                                    showQuickFilter: true,
                                    quickFilterProps: {
                                        debounceMs: 500,
                                    },
                                },
                            }}
                            sx={{
                                boxShadow: 2,
                                padding: 2,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
