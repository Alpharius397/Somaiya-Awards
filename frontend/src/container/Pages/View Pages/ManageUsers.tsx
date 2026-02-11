import React, { useState } from "react";
import SideBar from "@/components/SideBar";
import Field from "@/components/utils/Field";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PasswordValid from "@/zod/Forms/Password";
import { csvReader } from "@/zod/Auth/register";
/** No .d.ts for this */
import { Dropzone, FileMosaic } from "@files-ui/react";
import Papa from "papaparse";
import Axios, { DATA_URL } from "@/axios";
import { Institutes } from "@/shared/constants";
import { arrayChoice, email, anyString } from "@/shared/zod";
import { useData } from "@/hooks/data";
import swalAlert from "@/components/utils/swal";
import { Download } from "lucide-react";

type DropZoneFile = {
    file: File;
    id: number;
    name: string;
    size: number;
    type: "text/csv";
    valid: true;
};

export default function ManageUsers() {
    const institutionOptions = Institutes;

    const [files, setFiles] = useState<DropZoneFile[]>([]);

    const updateFiles = (incomingFiles: DropZoneFile[]) => {
        setFiles(incomingFiles);
    };

    const removeFile = () => {
        setFiles([]);
    };

    const handleUpload = async () => {
        const file: DropZoneFile = files[0];

        if (!file) {
            swalAlert({
                text: "File is missing or invalid.",
                icon: "error",
            });
            return;
        }

        if (file.type !== "text/csv") {
            swalAlert({
                text: "Invalid file type uploaded. Please upload valid file type",
                icon: "error",
            });
            return;
        }

        const text = await file.file.text();

        const parsedData = Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
        });

        const validCsv = csvReader.safeParse(parsedData.data || []);

        if (!validCsv.success) {
            swalAlert({
                title: "Incomplete Form",
                text: "Please ensure that uploaded csv matches the provided csv template",
                icon: "warning",
                backdrop: true,
                background: "rgba(255,250,250)",
                iconColor: "rgb(185,28,28)",
                confirmButtonColor: "rgb(185,28,28)",
                buttonsStyling: false,
                customClass: {
                    confirmButton: "gradient-button",
                },
            });
            return;
        }

        const data = {
            formData: validCsv.data,
        };

        Axios.post("/auth/bulk-create", data)
            .then(() => {
                swalAlert({
                    title: "Users were created successfully",
                    icon: "success",
                    confirmButtonColor: "rgb(185,28,28)",
                });

                setFiles([]);
            })
            .catch((err) => {
                console.error(err);
                swalAlert({
                    title: "Failed to create users",
                    icon: "warning",
                    backdrop: true,
                    background: "rgba(255,250,250)",
                    iconColor: "rgb(185,28,28)",
                    confirmButtonColor: "rgb(185,28,28)",
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: "gradient-button",
                    },
                });
            });
    };

    const { display, setData, handleChange, getData } = useData(PasswordValid);

    const handleSubmit = async () => {
        const data = getData();

        if (data === null) {
            toast.error("All fields required", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            await Axios.post("/auth/register", display)
                .then(() => {
                    setData({});
                    toast.success("User created successfully", {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                })
                .catch(() => {
                    toast.error("Failed to create User", {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                });
        }
    };

    return (
        <div>
            <div className="flex h-screen">
                <SideBar />
                <div className="flex flex-col w-full p-5 overflow-y-scroll">
                    <div className="font-Poppins text-2xl font-semibold">
                        <h2>Manage Users</h2>
                    </div>
                    <div className="flex justify-center">
                        <div className="w-[50%]  shadow-xl p-4 m-5">
                            <h2 className="font-Poppins text-center text-2xl my-3 text-red-700 font-semibold">
                                Add User
                            </h2>

                            <div className="px-3">
                                <Field
                                    validator={email}
                                    formType="Manage"
                                    title="Email ID"
                                    type="email"
                                    placeholder="awards.svv@somaiya.edu"
                                    name="user_email_id"
                                    fieldsPerLine={1}
                                    page={1}
                                    required={true}
                                    value={display["user_email_id"] || ""}
                                    onChange={handleChange}
                                />

                                <Field
                                    title="Role"
                                    fieldsPerLine={1}
                                    page={1}
                                    required={true}
                                    formType="Manage"
                                    type="dropdown"
                                    dropOpt="multiple"
                                    name="user_role"
                                    value={display["user_role"] || ""}
                                    validator={arrayChoice([
                                        "ADMIN",
                                        "IEAC",
                                        "HOI",
                                        "SPORTS ADMIN",
                                        "STUDENTS ADMIN",
                                        "RESEARCH ADMIN",
                                        "STUDENT",
                                        "PEER",
                                    ])}
                                    options={[
                                        "ADMIN",
                                        "IEAC",
                                        "HOI",
                                        "SPORTS ADMIN",
                                        "STUDENTS ADMIN",
                                        "RESEARCH ADMIN",
                                        "STUDENT",
                                        "PEER",
                                    ]}
                                    dropdownHiddenItem="Select Role"
                                    onChange={handleChange}
                                />

                                {display.user_role === "ADMIN" ||
                                display.user_role === "SPORTS ADMIN" ||
                                display.user_role === "STUDENTS ADMIN" ||
                                display.user_role ===
                                    "RESEARCH ADMIN" ? null : (
                                    <>
                                        <Field
                                            required={true}
                                            fieldsPerLine={1}
                                            page={1}
                                            formType="Manage"
                                            validator={anyString}
                                            title="Institution"
                                            type="dropdown"
                                            dropOpt="multiple"
                                            name="user_institution"
                                            value={
                                                display.user_institution || ""
                                            }
                                            options={institutionOptions}
                                            dropdownHiddenItem="Select institution"
                                            onChange={handleChange}
                                        />
                                    </>
                                )}

                                <Field
                                    title="Password"
                                    required={true}
                                    fieldsPerLine={1}
                                    page={1}
                                    formType="Manage"
                                    validator={anyString}
                                    type="password"
                                    name="user_password"
                                    value={display.user_password || ""}
                                    placeholder="set default password"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex justify-center my-4">
                                <div
                                    onClick={handleSubmit}
                                    className="bg-red-700 rounded-lg p-3 w-[30%] text-center text-white font-Poppins hover:bg-red-600"
                                >
                                    Create New User
                                </div>
                                <ToastContainer />
                            </div>

                            <div className=" my-10">
                                <Dropzone
                                    onChange={updateFiles}
                                    value={files}
                                    className="font-Poppins text-sm"
                                    color="#910904"
                                    accept=".csv"
                                    maxFileSize={5 * 1024 * 1024} // 5MB
                                    maxFiles={1}
                                    actionButtons={{
                                        position: "after",
                                        deleteButton: {
                                            style: {
                                                backgroundColor: "#ff8175",
                                            },
                                            onClick: removeFile,
                                        },
                                        uploadButton: {
                                            style: {
                                                backgroundColor: "#32a852",
                                            },
                                            onClick: handleUpload,
                                            label: "Submit",
                                        },
                                        myButton: {},
                                    }}
                                    footerConfig={{
                                        customMessage:
                                            "Only CSV files up to 5MB are allowed",
                                    }}
                                    label={"📃 Drop Files here"}
                                    behaviour="replace"
                                >
                                    {files.map((file) => (
                                        <FileMosaic
                                            key={file.name}
                                            {...file}
                                            onDelete={removeFile}
                                            info
                                            preview
                                            smartImgFit="orientation"
                                        />
                                    ))}
                                </Dropzone>
                                <a
                                    target="_blank"
                                    href={`${DATA_URL}/template/User_Register_Template.csv`}
                                    download
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition m-1 -translate-y-10"
                                >
                                    <Download className="w-4 h-4" />
                                    Download Template
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
