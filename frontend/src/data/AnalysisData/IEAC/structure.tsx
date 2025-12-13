/* eslint-disable react-refresh/only-export-components */

// column structures for HOI analysis part

/**
 * As IEAC Member can see 5 forms data define 5 columns structue that will be exported for analysis part
 * We use material UI's GridColDef to define
 *
 * column01 - outstanding Institution
 * column02 - Research
 * column03 - Sports
 * column04 - Teaching
 * column05 - NonTeaching
 *
 *
 * Also an extra upload button to uplad file with analysis
 */

import { type GridColDef } from "@mui/x-data-grid";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import Swal from "sweetalert2";
import Axios, { generateLink } from "@/axios";
import React from "react";
import jsxToHtml from "@/hooks/render";
import {
    teachingIEACScore,
    TeachingIEACScoreType,
} from "@/shared/zod/form/TeachingIEACScore";
import {
    nonTeachingIEACScore,
    NonTeachingIEACScoreType,
} from "@/shared/zod/form/NonTeachingIEACScore";

function NonTeachingPreConfirm() {
    const scoreA = parseInt(
        (Swal.getPopup()?.querySelector("#score-A") as HTMLInputElement)?.value
    );
    const scoreB = parseInt(
        (Swal.getPopup()?.querySelector("#score-B") as HTMLInputElement)?.value
    );

    const response = nonTeachingIEACScore.safeParse({
        ieac_scoreA: scoreA,
        ieac_scoreB: scoreB,
    });

    if (!response.success) {
        Swal.showValidationMessage(
            "All values must be filled and be in the range of 1 to 10"
        );
    }
    return response;
}

function TeachingPreConfirm() {
    const scoreA = parseInt(
        (Swal.getPopup()?.querySelector("#score-A") as HTMLInputElement)?.value
    );
    const scoreB = parseInt(
        (Swal.getPopup()?.querySelector("#score-B") as HTMLInputElement)?.value
    );
    const scoreC = parseInt(
        (Swal.getPopup()?.querySelector("#score-C") as HTMLInputElement)?.value
    );

    const response = teachingIEACScore.safeParse({
        ieac_scoreA: scoreA,
        ieac_scoreB: scoreB,
        ieac_scoreC: scoreC,
    });

    if (!response.success) {
        Swal.showValidationMessage(
            "All values must be filled and be in the range of 1 to 10"
        );
    }
    return response;
}

function sendRequest(data: NonTeachingIEACScoreType | TeachingIEACScoreType) {
    const path = window.location.href.split("/review/")[1];
    Axios.put(`/ieac/data/${path}`, data)
        .then(() => {
            Swal.fire({
                title: "Update Successful",
                icon: "success",
                confirmButtonColor: "rgb(185,28,28)",
                confirmButtonText: "Okay",
            }).then(() => {
                window.location.reload();
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

type TeachingParams = { name: string };

function TeachingIEAC({ name }: TeachingParams) {
    return jsxToHtml(
        <div>
            <div className="my-3 text-center text-xl text-red-700 font-Poppins font-semibold">
                <h2>{name}'s Score</h2>
            </div>
            <div className="text-sm text-left font-Poppins text-red-700 my-2">
                <p> A. Pedagogical Competence Score </p>
            </div>
            <div className="flex justify-start my-1">
                <input
                    type="number"
                    className="border-2 font-Poppins border-black shadow-lg rounded-xl p-2"
                    id="score-A"
                ></input>
            </div>
            <div className="text-sm text-left font-Poppins text-red-700 my-2">
                <p>B.Beyond the classroom </p>
            </div>
            <div className="flex justify-start my-1">
                <input
                    type="number"
                    className="border-2 font-Poppins border-black shadow-lg rounded-xl p-2"
                    id="score-B"
                ></input>
            </div>
            <div className="text-sm text-left font-Poppins text-red-700 my-2">
                <p> C. Self and professional development </p>
            </div>
            <div className="flex justify-start my-1">
                <input
                    type="number"
                    className="border-2 font-Poppins border-black shadow-lg rounded-xl p-2"
                    id="score-C"
                ></input>
            </div>
        </div>
    );
}

type NonTeachingParams = { name: string };

function NonTeachingIEAC({ name }: NonTeachingParams) {
    return jsxToHtml(
        <div>
            <div className="my-3 text-center text-xl text-red-700 font-Poppins font-semibold">
                <h2>{name}'s Score</h2>
            </div>
            <div className="text-sm text-left font-Poppins text-red-700 my-2">
                <p> Part A Score</p>
            </div>
            <div className="flex justify-start my-1">
                <input
                    type="number"
                    className="border-2 font-Poppins border-black shadow-lg rounded-xl p-2"
                    id="score-A"
                ></input>
            </div>
            <div className="text-sm text-left font-Poppins text-red-700 my-2">
                <p>Part B Score </p>
            </div>
            <div className="flex justify-start my-1">
                <input
                    type="number"
                    className="border-2 font-Poppins border-black shadow-lg rounded-xl p-2"
                    id="score-B"
                ></input>
            </div>
        </div>
    );
}
/**
 * Handlers
 */

/**Teaching Handles */

const handleTeachRecommend = (params, event) => {
    if (event.target.checked == true) {
        Swal.fire({
            title: "Score for Recommended",
            confirmButtonText: "Confirm",
            confirmButtonColor: "rgb(185,28,28)",
            html: TeachingIEAC({ name: params.row["faculty_name"] }),
            preConfirm: TeachingPreConfirm,
        })
            .then((res) => {
                if (res.isConfirmed == true) {
                    const data: TeachingIEACScoreType = {
                        ...res.value,
                        ieacApproved: true,
                        applicationID: params.row["id"],
                    };

                    // make a put request Axios
                    sendRequest(data);
                } else {
                    event.target.checked = false;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

const handleTeachNotRecommend = (params, event) => {
    if (event.target.checked == true) {
        Swal.fire({
            title: "Score for Not Recommended",
            confirmButtonText: "Confirm",
            confirmButtonColor: "rgb(185,28,28)",
            html: TeachingIEAC({ name: params.row["faculty_name"] }),
            preConfirm: TeachingPreConfirm,
        }).then((res) => {
            if (res.isConfirmed == true) {
                // creata a payload to pass
                const data: TeachingIEACScoreType = {
                    ...res.value,
                    ieacApproved: false,
                    applicationID: params.row["id"],
                };

                // make a put request Axios
                sendRequest(data);
            } else {
                event.target.checked = false;
            }
        });
    }
};

/**Non teaching Handles */
const handleNonTeachRecommend = (params, event) => {
    if (event.target.checked == true) {
        Swal.fire({
            title: "Score for Recommended",
            confirmButtonText: "Confirm",
            confirmButtonColor: "rgb(185,28,28)",
            html: NonTeachingIEAC({ name: params.row["staff_name"] }),
            preConfirm: NonTeachingPreConfirm,
        }).then((res) => {
            if (res.isConfirmed == true) {
                // creata a payload to pass
                const data: NonTeachingIEACScoreType = {
                    ...res.value,
                    recommended: true,
                    applicationID: params.row["id"],
                };

                // make a put request Axios
                sendRequest(data);
            } else {
                event.target.checked = false;
            }
        });
    }
};

const handleNonTeachNotRecommend = (params, event) => {
    if (event.target.checked == true) {
        Swal.fire({
            title: "Score for Not Recommended",
            confirmButtonText: "Confirm",
            confirmButtonColor: "rgb(185,28,28)",
            html: NonTeachingIEAC({ name: params.row["staff_name"] }),
            preConfirm: NonTeachingPreConfirm,
        }).then((res) => {
            if (res.isConfirmed == true) {
                // creata a payload to pass
                const data: NonTeachingIEACScoreType = {
                    ...res.value,
                    ieacApproved: false,
                    applicationID: params.row["id"],
                };

                // make a put request Axios
                sendRequest(data);
            } else {
                event.target.checked = false;
            }
        });
    }
};

const columns01: GridColDef[] = [
    { field: "id", headerName: "Application ID", width: 150 },
    { field: "email_id", headerName: "Email ID", width: 150 },
    {
        field: "nomination_category",
        headerName: "Nomination Category",
        width: 200,
    },
    { field: "institution_name", headerName: "Institution Name", width: 200 },
    { field: "established_In", headerName: "Established In", width: 150 },
    {
        field: "head_of_institution",
        headerName: "Head of Institution",
        width: 200,
    },
    { field: "hoi_designation", headerName: "HOI Designation", width: 200 },
    { field: "hoi_joining_date", headerName: "HOI Joining Date", width: 200 },
    { field: "somaiya_mail_id", headerName: "Somaiya Mail ID", width: 200 },
    { field: "contact_number", headerName: "Contact Number", width: 150 },
    { field: "q_01", headerName: "Question 01", width: 200 },
    { field: "q_02", headerName: "Question 02", width: 200 },
    { field: "q_03", headerName: "Question 03", width: 200 },
    { field: "q_04", headerName: "Question 04", width: 200 },
    { field: "q_05", headerName: "Question 05", width: 200 },
    { field: "q_06", headerName: "Question 06", width: 200 },
    { field: "q_07", headerName: "Question 07", width: 200 },
    { field: "q_08", headerName: "Question 08", width: 200 },
    { field: "q_09", headerName: "Question 09", width: 200 },
    { field: "q_10", headerName: "Question 10", width: 200 },
    { field: "q_11", headerName: "Question 11", width: 200 },
    { field: "q_12", headerName: "Question 12", width: 200 },
    { field: "q_13", headerName: "Question 13", width: 200 },
    { field: "q_14", headerName: "Question 14", width: 200 },
    { field: "q_15", headerName: "Question 15", width: 200 },
    { field: "q_16", headerName: "Question 16", width: 200 },
    { field: "q_17", headerName: "Question 17", width: 200 },
    {
        field: "institution_ratings",
        headerName: "Institution Ratings",
        width: 200,
    },
    { field: "q_18", headerName: "Question 18", width: 200 },
    { field: "q_19", headerName: "Question 19", width: 200 },
    { field: "q_20", headerName: "Question 20", width: 200 },
    { field: "q_21", headerName: "Question 21", width: 200 },
    { field: "q_22", headerName: "Question 22", width: 200 },
    { field: "q_23", headerName: "Question 23", width: 200 },
    { field: "q_24", headerName: "Question 24", width: 200 },
    { field: "q_25", headerName: "Question 25", width: 200 },
    { field: "q_26", headerName: "Question 26", width: 200 },
    { field: "q_27", headerName: "Question 27", width: 200 },
    { field: "q_28", headerName: "Question 28", width: 200 },
    { field: "q_29", headerName: "Question 29", width: 200 },
    { field: "q_30", headerName: "Question 30", width: 200 },
    { field: "q_31", headerName: "Question 31", width: 200 },
    { field: "q_32", headerName: "Question 32", width: 200 },
    { field: "q_33", headerName: "Question 33", width: 200 },
    { field: "q_34", headerName: "Question 34", width: 200 },
    { field: "q_35", headerName: "Question 35", width: 200 },
    { field: "q_36", headerName: "Question 36", width: 200 },
    { field: "q_37", headerName: "Question 37", width: 200 },
    { field: "q_38", headerName: "Question 38", width: 200 },
    {
        field: "supportings",
        headerName: "Supportings",
        width: 200,
        renderCell: (params) => {
            return (
                <a
                    href={generateLink(params.value)}
                    className="p-2 rounded-2xl cursor-pointer bg-red-700 text-white font-Poppins"
                    download
                >
                    Download
                </a>
            );
        },
    },
    {
        field: "ieac_approved",
        headerName: "IEAC Approved",
        width: 150,
        renderCell: (params) => {
            return params.value ? (
                <CheckRoundedIcon style={{ color: "#15803d" }} />
            ) : (
                <CloseRoundedIcon style={{ color: "rgb(185,28,28)" }} />
            );
        },
    },
];

const columns04: GridColDef[] = [
    { field: "id", headerName: "Application ID", width: 150 },
    { field: "email_id", headerName: "Email ID", width: 150 },
    { field: "faculty_name", headerName: "Faculty Name", width: 150 },
    { field: "awards_category", headerName: "Awards Category", width: 150 },
    { field: "institution_name", headerName: "Institute Name", width: 150 },
    { field: "department", headerName: "Department", width: 150 },
    { field: "designation", headerName: "Designation", width: 150 },
    {
        field: "date_of_appointment",
        headerName: "Date of Appointment",
        width: 200,
    },
    { field: "somaiya_mail_id", headerName: "Somaiya Mail ID", width: 150 },
    { field: "contact_number", headerName: "Contact Number", width: 150 },
    { field: "q_01", headerName: "Q01", width: 100 },
    { field: "q_02", headerName: "Q02", width: 100 },
    { field: "q_03", headerName: "Q03", width: 100 },
    { field: "q_04", headerName: "Q04", width: 100 },
    { field: "q_05", headerName: "Q05", width: 100 },
    { field: "q_06", headerName: "Q06", width: 100 },
    { field: "q_07", headerName: "Q07", width: 100 },
    { field: "q_08", headerName: "Q08", width: 100 },
    { field: "q_09", headerName: "Q09", width: 100 },
    { field: "q_10", headerName: "Q10", width: 100 },
    { field: "q_11", headerName: "Q11", width: 100 },
    { field: "q_12", headerName: "Q12", width: 100 },
    { field: "q_13", headerName: "Q13", width: 100 },
    { field: "q_14", headerName: "Q14", width: 100 },
    { field: "q_15", headerName: "Q15", width: 100 },
    { field: "q_16", headerName: "Q16", width: 100 },
    { field: "q_17", headerName: "Q17", width: 100 },
    { field: "q_18", headerName: "Q18", width: 100 },
    { field: "q_19", headerName: "Q19", width: 100 },
    { field: "q_20", headerName: "Q20", width: 100 },
    { field: "q_21", headerName: "Faculty Achievements", width: 300 },
    {
        field: "data_evidence",
        headerName: "Data Evidence",
        width: 200,
        renderCell: (params) => {
            return (
                <a
                    href={generateLink(params.value)}
                    className="p-2 rounded-2xl cursor-pointer bg-red-700 text-white font-Poppins"
                    download
                >
                    Download
                </a>
            );
        },
    },
    {
        field: "profile_photograph",
        headerName: "Profile Photograph",
        width: 200,
        renderCell: (params) => {
            return (
                <a
                    href={generateLink(params.value)}
                    className="p-2 rounded-2xl cursor-pointer bg-red-700 text-white font-Poppins"
                    download
                >
                    Download
                </a>
            );
        },
    },
    {
        field: "recommended",
        headerName: "Recommended",
        width: 150,
        align: "center",
        renderCell: (params) => {
            return params.row["ieac_scoreA"] == null ? (
                <input
                    type="checkbox"
                    name="recommend"
                    onChange={(event) => handleTeachRecommend(params, event)}
                ></input>
            ) : (
                "Completed"
            );
        },
    },
    {
        field: "not-recommended",
        headerName: "Not Recommended",
        width: 150,
        align: "center",
        renderCell: (params) => {
            return params.row["ieac_scoreA"] == null ? (
                <input
                    type="checkbox"
                    name="not-recommend"
                    onChange={(event) => handleTeachNotRecommend(params, event)}
                ></input>
            ) : (
                "Completed"
            );
        },
    },
    {
        field: "ieacApprovedFile",
        headerName: "Approved Reason File",
        width: 200,
        renderCell: (params) => {
            if (!params.row["ieacApprovedFile"]) {
                return "Upload Pending ...";
            } else {
                return (
                    <a
                        href={generateLink(params.value)}
                        className="p-2 rounded-2xl cursor-pointer bg-red-700 text-white font-Poppins"
                        download
                    >
                        Download
                    </a>
                );
            }
        },
    },
    {
        field: "ieacApproved",
        headerName: "IEAC Approved",
        type: "boolean",
        width: 150,
        renderCell: (params) => {
            return params.value ? (
                <CheckRoundedIcon style={{ color: "#15803d" }} />
            ) : (
                <CloseRoundedIcon style={{ color: "rgb(185,28,28)" }} />
            );
        },
    },
];

const columns05: GridColDef[] = [
    { field: "id", headerName: "Application ID", width: 150 },
    { field: "email_id", headerName: "Email ID", width: 150 },
    { field: "staff_name", headerName: "Staff Name", width: 150 },
    { field: "award_category", headerName: "Award Category", width: 150 },
    { field: "institution_name", headerName: "Institute Name", width: 150 },
    { field: "department", headerName: "Department", width: 150 },
    { field: "designation", headerName: "Designation", width: 150 },
    { field: "appointment_date", headerName: "Appointment Date", width: 200 },
    { field: "somaiya_email_id", headerName: "Somaiya Email ID", width: 150 },
    { field: "phone_number", headerName: "Phone Number", width: 150 },
    { field: "q_01", headerName: "Q01", width: 100 },
    { field: "q_02", headerName: "Q02", width: 100 },
    { field: "q_03", headerName: "Q03", width: 100 },
    { field: "q_04", headerName: "Q04", width: 100 },
    { field: "q_05", headerName: "Q05", width: 100 },
    { field: "q_06", headerName: "Q06", width: 100 },
    { field: "q_07", headerName: "Q07", width: 100 },
    { field: "q_08", headerName: "Q08", width: 100 },
    { field: "q_09", headerName: "Q09", width: 100 },
    { field: "q_10", headerName: "Q10", width: 100 },
    { field: "q_11", headerName: "Q11", width: 100 },
    { field: "q_12", headerName: "Q12", width: 100 },
    { field: "q_13", headerName: "Q13", width: 100 },
    { field: "q_14", headerName: "Q14", width: 100 },
    { field: "q_15", headerName: "Q15", width: 100 },
    { field: "q_16", headerName: "Q16", width: 100 },
    { field: "q_17", headerName: "Q17", width: 100 },
    { field: "q_18", headerName: "Q18", width: 100 },
    { field: "q_19", headerName: "Q19", width: 100 },
    { field: "q_20", headerName: "Q20", width: 100 },
    { field: "q_21", headerName: "Q21", width: 100 },
    { field: "q_22", headerName: "Q22", width: 100 },
    { field: "q_23", headerName: "Q23", width: 100 },
    { field: "q_24", headerName: "Q24", width: 100 },
    {
        field: "proof_docs",
        headerName: "Proof Documents",
        width: 200,
        renderCell: (params) => {
            return (
                <a
                    href={generateLink(params.value)}
                    className="p-2 rounded-2xl cursor-pointer bg-red-700 text-white font-Poppins"
                    download
                >
                    Download
                </a>
            );
        },
    },
    {
        field: "nominee_photograph",
        headerName: "Nominee Photograph",
        width: 200,
        renderCell: (params) => {
            return (
                <a
                    href={generateLink(params.value)}
                    className="p-2 rounded-2xl cursor-pointer bg-red-700 text-white font-Poppins"
                    download
                >
                    Download
                </a>
            );
        },
    },
    {
        field: "recommended",
        headerName: "Recommended",
        width: 150,
        align: "center",
        renderCell: (params) => {
            return params.row["ieac_scoreA"] == null ? (
                <input
                    type="checkbox"
                    name="recommend"
                    onChange={(event) => handleNonTeachRecommend(params, event)}
                ></input>
            ) : (
                "Completed"
            );
        },
    },
    {
        field: "not-recommended",
        headerName: "Not Recommended",
        width: 150,
        align: "center",
        renderCell: (params) => {
            return params.row["ieac_scoreA"] == null ? (
                <input
                    type="checkbox"
                    name="not-recommend"
                    onChange={(event) =>
                        handleNonTeachNotRecommend(params, event)
                    }
                ></input>
            ) : (
                "Completed"
            );
        },
    },
    {
        field: "ieacApprovedFile",
        headerName: "Approved Reason File",
        width: 200,
        renderCell: (params) => {
            if (!params.row["ieacApprovedFile"]) {
                return "Upload Pending ...";
            } else {
                return (
                    <a
                        href={generateLink(params.value)}
                        className="p-2 rounded-2xl cursor-pointer bg-red-700 text-white font-Poppins"
                        download
                    >
                        Download
                    </a>
                );
            }
        },
    },
    {
        field: "ieacApproved",
        headerName: "IEAC Approved",
        type: "boolean",
        width: 150,
        renderCell: (params) => {
            return params.value ? (
                <CheckRoundedIcon style={{ color: "#15803d" }} />
            ) : (
                <CloseRoundedIcon style={{ color: "rgb(185,28,28)" }} />
            );
        },
    },
];

export { columns01, columns04, columns05 };
