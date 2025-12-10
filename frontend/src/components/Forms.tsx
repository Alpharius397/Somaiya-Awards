import React, { useState, useEffect, useMemo, useCallback } from "react";
import FormStages from "@/components/FormStages";
import Field from "@/components/utils/Field";
import { useNavigate, createSearchParams } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Axios from "@/axios";
import type { StagesType } from "@/components/utils/data/types";
import swalAlert from "@/components/utils/swal";
import type { FormEntry } from "@/data/Forms/types";
import z from "zod";
import { lastDate, rangeDate } from "@/backend/zod";
import { useData } from "@/hooks/data";
import { DISABLE_CLEAR_FORM } from "@/constants";

export type FormProps = {
    pageCount: number;
    pageHeadings: string[];
    data: FormEntry[];
    stages: StagesType[];
    message?: string;
    validator: z.ZodObject;
};

export type FormData = {
    [key: string]: string | File | number;
};

function youAreSpecial(
    name: string,
    value: string,
    defaultValidator: z.ZodType
) {
    if (!["appointment_date", "date_of_appointment"].includes(name))
        return defaultValidator;

    if (value.startsWith("Promising")) {
        return rangeDate(2, 3);
    } else {
        return lastDate(3);
    }
}

export default function Forms(props: FormProps) {
    /**
     * Variables and States
     */

    const limit = props.pageCount;
    const pageHeaders = props.pageHeadings;
    const navigate = useNavigate();

    const [current, setCurrent] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const formName = useMemo(
        () => window.location.href.split("/forms/")[1],
        []
    );

    /**
     * functions
     */

    const handleNext = () => {
        for (const i of props.data) {
            if (
                i.page - 1 === current &&
                !i.validator.safeParse(data[i.name]).success
            ) {
                swalAlert({
                    title: "Incomplete Form",
                    text: "Please fill out this page completely",
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
        }
        if (current < limit) {
            setCurrent(current + 1);
        }

        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    const handlePrevious = () => {
        for (const i of props.data) {
            if (
                i.page - 1 === current &&
                !i.validator.safeParse(data[i.name]).success
            ) {
                swalAlert({
                    title: "Incomplete Form",
                    text: "Please fill out this page completely",
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
        }
        if (current > 0) {
            setCurrent(current - 1);
        }
    };

    const { clearData, display, getData, handleChange, data, setData } =
        useData<z.infer<typeof props.validator>>(props.validator, formName);

    const handleFieldChange = useCallback(
        (name: string, value: string | File, actionType: "add" | "delete") => {
            handleChange(name, value, actionType);
            setData((prev) => {
                localStorage.setItem(formName, JSON.stringify(prev));
                setPercentage(Object.keys(prev).length / props.data.length);
                return prev;
            });
        },
        [formName, handleChange, props.data.length, setData]
    );

    /**
     * @returns page number of field which is not present in formData state
     */

    const missingFieldPage = () => {
        for (const field of props.data) {
            if (!data[field.name]) {
                return field.page;
            }
        }

        return null;
    };

    const handleSubmit = () => {
        const Data = getData();

        if (!Data) {
            swalAlert({
                title: "Incomplete Form",
                text: "Please fill out the form completely",
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

            const incompletePageNumber = missingFieldPage();

            if (incompletePageNumber !== null)
                setCurrent(incompletePageNumber - 1);
        } else {
            const formType = formName;
            const postUrl = `/forms/${formType}`;

            Axios.post(postUrl, Data, {
                headers: {
                    "Content-Type": formType.includes("feedback")
                        ? "application/json"
                        : "multipart/form-data",
                },
            })
                .then(() => {
                    if (!DISABLE_CLEAR_FORM) {
                        clearData();
                    }
                    navigate({
                        pathname: "/forms/cards",
                        search: createSearchParams({
                            submitted: "true",
                            title: "Form submitted Successfully",
                        }).toString(),
                    });
                })
                .catch(() => {
                    swalAlert({
                        text: "Submission failed",
                        icon: "error",
                    });
                });
        }
    };

    const colorChange = () => {
        const stagesList = document.querySelectorAll(".stages");

        for (const stages of stagesList) {
            const stageNumber = Number(stages.innerHTML);

            if (stageNumber < current + 1) {
                stages.classList.add("bg-red-500");
                stages.classList.add("text-white");
                stages.classList.remove("bg-white");
            } else {
                stages.classList.remove("bg-red-500");
                stages.classList.remove("text-white");
                stages.classList.add("bg-white");
            }
        }
    };

    const handleFormStageChange = (e: React.MouseEvent<HTMLElement>) => {
        //@ts-expect-error Event type matching ignore
        const value = Number(e.target.innerHTML) - 1;
        setCurrent(value); // renders everything

        // color change logic
        colorChange();
    };

    /**
     * Renderers
     */

    const RenderFields = useMemo(() => {
        return props.data
            .filter((entry) => current === entry.page - 1)
            .map((entry) => {
                const value = display[entry.name] || "";
                const validator = youAreSpecial(
                    entry.name,
                    ((display["awards_category"] ||
                        display["award_category"]) as string) || "",
                    entry.validator
                );

                return (
                    <Field
                        key={entry.name}
                        {...entry}
                        value={value}
                        //@ts-expect-error TODO: fix Validator type
                        validator={validator}
                        formType={formName}
                        onChange={handleFieldChange}
                    />
                );
            });
    }, [props.data, current, display, formName, handleFieldChange]);

    useEffect(() => {
        setPercentage(Object.keys(data).length / props.data.length);
    }, [data]);

    useEffect(() => {
        // is this necessary?

        const stagesList = document.querySelectorAll(".stages");

        for (const stages of stagesList) {
            const stageNumber = Number(stages.innerHTML);

            if (stageNumber < current + 1) {
                stages.classList.add("bg-red-500");
                stages.classList.remove("bg-white");
                stages.classList.add("text-white");
            } else {
                stages.classList.remove("bg-red-500");
                stages.classList.remove("text-white");
                stages.classList.add("bg-white");
            }
        }
    }, [current]);
    /**
     * Return Block
     */

    return (
        <div className="">
            <FormStages stages={props.stages} onClick={handleFormStageChange} />

            <div className="border-black border-[1] mx-auto rounded-xl shadow-2xl bg-0xFAF9F6 p-3 px-[5rem] w-[70%]">
                <div className="w-full text-black text-center py-5  font-Roboto font-semibold text-2xl">
                    {pageHeaders[current]}
                </div>
                <div className="p-5 flex justify-center">
                    <CircularProgressbar
                        className="w-16 h-16"
                        maxValue={100}
                        value={Math.round(percentage * 100)}
                        text={`${Math.round(percentage * 100)} %`}
                    />
                </div>

                {props.message === undefined ? null : (
                    <div className="text-md font-Poppins mt-[3rem] bg-red-300  font-bold italic rounded-lg p-3 my-6">
                        {props.message}
                    </div>
                )}
                <div className="text-center  mb-[3rem] text-sm italic">
                    Page {current + 1} of {limit + 1}
                </div>

                <div className="form py-5 px-3">
                    {RenderFields}

                    <div className="mt-10 px-3 flex justify-between">
                        <button
                            onClick={handlePrevious}
                            className="shadow-md w-28 bg-red-700 text-white text-lg p-3 rounded-xl"
                        >
                            Previous
                        </button>
                        {current === limit ? (
                            <button
                                onClick={handleSubmit}
                                id="submit-btn"
                                className="shadow-md w-28 bg-red-700 text-white text-lg p-3 rounded-xl"
                            >
                                Submit
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                className="shadow-md w-28 border-red-700  bg-white border-2 ml-5 hover:bg-red-700 hover:text-white text-lg p-3 rounded-xl"
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
