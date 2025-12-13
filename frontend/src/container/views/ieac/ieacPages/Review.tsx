import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "@/container/views/ieac/ieacComponents/Sidebar";
import { useLocation } from "react-router-dom";
import { DataGrid, type GridColDef, GridToolbar } from "@mui/x-data-grid";
import {
    columns01,
    columns04,
    columns05,
} from "@/data/AnalysisData/IEAC/structure";
import Swal from "sweetalert2";
import Axios from "@/axios";
import React from "react";

export default function Review() {
    const [title, setTitle] = useState("");
    const [columns, setColumns] = useState<GridColDef[]>([]);
    const [rows, setRows] = useState<{ ieacApprovedFile: File }[]>([]);
    const location = useLocation();
    const navigate = useNavigate();
    const pathLabel = location.pathname.split("/review/")[1];

    useEffect(() => {
        setTitle(pathLabel);

        switch (pathLabel) {
            case "outstanding-institution":
                setColumns(columns01);
                break;

            case "teaching":
                setColumns(columns04);
                break;

            case "non-teaching":
                setColumns(columns05);
                break;

            default:
                navigate("/ieac");
        }

        const url = `/hoi/data/${pathLabel}`;

        Axios.get(url)
            .then((res) => {
                if (res.data) {
                    setRows(res.data.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [navigate, pathLabel]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const data = {
            approvalFile: (event.target.files as FileList)[0],
        };

        const path = window.location.href.split("/review/")[1];

        //Axios file upload
        Swal.fire({
            title: "Confirmation",
            icon: "question",
            text: `Selected File: ${data.approvalFile.name}`,
            showDenyButton: true,
            confirmButtonText: "Upload File",
        }).then((res) => {
            if (res.isConfirmed == true) {
                Axios.post(`/ieac/data/${path}`, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            title: "File Uploaded Successfully",
                        }).then(() => {
                            window.location.reload();
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        });
    };

    return (
        <div className="flex h-screen">
            <SideBar />

            <div className="flex p-5 flex-col w-full font-Poppins overflow-y-scroll">
                <h2 className="text-xl font-semibold">
                    {title.toUpperCase()} Form Responses
                </h2>
                <div className="mt-[3rem] p-2">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        density="comfortable"
                        slots={{ toolbar: GridToolbar }}
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
                {!window["SECRET_FLAG"] && rows[0] ? (
                    rows[0]?.ieacApprovedFile != null ? null : (
                        <input
                            type="file"
                            name="approvalFile"
                            onChange={handleFileChange}
                        />
                    )
                ) : (
                    <input
                        type="file"
                        name="approvalFile"
                        onChange={handleFileChange}
                    />
                )}
            </div>
        </div>
    );
}
