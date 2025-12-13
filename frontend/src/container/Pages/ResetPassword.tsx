import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Wave from "react-wavify";
import Field from "@/components/utils/Field";
import React from "react";
import ForgotValidator, { ForgotType } from "@/zod/Forms/ForgotPassword";
import { email, anyString } from "@/shared/zod";
import Axios from "@/axios";
import { useData } from "@/hooks/data";

export default function ResetPassword() {
    const { id, token } = useParams();
    const { display, getData, handleChange } =
        useData<ForgotType>(ForgotValidator);
    const [confirmation, setConfirmation] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        Axios.post(`/auth/${id}/${token}`, getData())
            .then(() => {
                setConfirmation(true);
                setTimeout(() => {
                    navigate("/auth/login");
                }, 3000);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <Navbar />

            <div className="flex items-center mt-[3rem]">
                <div className="mx-auto shadow-xl w-[30%] p-5 rounded-md">
                    <div>
                        <h2 className="text-center text-2xl text-red-700 font-Poppins font-semibold">
                            {!confirmation ? "Reset Password" : null}
                        </h2>
                    </div>

                    {!confirmation ? (
                        <>
                            <div className="p-5 mt-3 font-Poppins">
                                <Field
                                    placeholder="kjsit_hoi@gmail.com"
                                    title="Email ID"
                                    type="email"
                                    formType="Forgot"
                                    fieldsPerLine={2}
                                    page={1}
                                    required={true}
                                    validator={email}
                                    value={display.user_email || ""}
                                    onChange={handleChange}
                                    name="user_email"
                                />

                                <Field
                                    placeholder="password"
                                    title="New Password"
                                    type="password"
                                    validator={anyString}
                                    fieldsPerLine={2}
                                    page={1}
                                    required={true}
                                    formType="Forgot"
                                    value={display.user_password_new || ""}
                                    onChange={handleChange}
                                    name="user_password_new"
                                />
                            </div>
                            <div className="p-4 flex justify-center mb-[2rem] font-Poppins">
                                <button
                                    onClick={handleClick}
                                    className="w-[70%] text-white rounded-lg bg-red-700 p-3 hover:bg-red-600"
                                >
                                    Change Password
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="p-5 text-center font-Poppins">
                                <h2 className="text-2xl font-semibold  text-green-600">
                                    Password changed successfully
                                </h2>
                                <p className="my-5 mt-[4rem]">
                                    You will be shortly redirected to login
                                    page.
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <Wave
                fill="#b91c1c"
                paused={false}
                className="absolute bottom-0"
                options={{
                    height: 10,
                    amplitude: 50,
                    speed: 0.15,
                    points: 5,
                }}
            />
        </div>
    );
}
