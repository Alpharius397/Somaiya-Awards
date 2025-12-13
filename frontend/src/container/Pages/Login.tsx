import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Wave from "react-wavify";
import Field from "@/components/utils/Field";
import { anyString, email } from "@/shared/zod";
import Axios from "@/axios";
import LoginValidator, { type LoginType } from "@/zod/Forms/Login";
import swalAlert from "@/components/utils/swal";
import { useData } from "@/hooks/data";
import React from "react";

export default function Login() {
    const navigate = useNavigate();
    const { display, getData, handleChange } =
        useData<LoginType>(LoginValidator);

    const handleClick = () => {
        navigate("/auth/forgot-password");
    };

    const handleSubmit = async () => {
        const data = getData();

        if (data) {
            await Axios.post("/auth/login", data)
                .then((res) => {
                    localStorage.setItem("role", res.data["role"]);
                    localStorage.setItem(
                        "institution",
                        res.data["institution"]
                    );

                    swalAlert({
                        title: "Authentication Successful!",
                        text: "Redirecting to Dashboard",
                        icon: "success",
                    });
                    switch (res.data["role"]) {
                        case "ADMIN":
                            navigate("/admin/dashboard");
                            break;

                        case "IEAC":
                            navigate("/ieac");
                            break;

                        case "HOI":
                            navigate("/hoi");
                            break;

                        case "STUDENTS ADMIN":
                            navigate("/students-admin");
                            break;

                        case "SPORTS ADMIN":
                            navigate("/sports-admin");
                            break;

                        case "STUDENT":
                            navigate("/students");
                            break;

                        case "PEER":
                            navigate("/peers");
                            break;

                        case "RESEARCH ADMIN":
                            navigate("/research-admin");
                            break;
                        default:
                            swalAlert({
                                title: "Role was not found!",
                                text: "User was found, but role was not",
                                icon: "success",
                            });
                    }
                })
                .catch(() => {
                    swalAlert({
                        title: "User not Found",
                        imageUrl:
                            "https://img.freepik.com/premium-vector/male-student-feeling-confused-while-looking-up-with-thoughtful-focused-expression-questioned-thinking-curious-with-question-mark-concept-illustration_270158-365.jpg?w=2000",
                        imageHeight: "200",
                        text: "Check your email ID, password and retry",
                        confirmButtonColor: "rgb(185,28,28)",
                    });
                });
        } else {
            swalAlert({
                title: "All Fields Required",
                text: "You may have missed to enter some fields",
                icon: "info",
                confirmButtonColor: "rgb(185,28,28)",
            });
        }
    };

    return (
        <div className="h-screen">
            <Navbar />

            <div className="flex items-center mt-[3rem]">
                <div className="mx-auto shadow-xl w-[30%] p-5 rounded-md">
                    <div className="text-center">
                        <h2 className="font-Poppins text-2xl font-semibold text-red-700">
                            Login
                        </h2>
                    </div>
                    <div className="p-5">
                        <Field
                            page={1}
                            placeholder="kjsit_hoi@somaiya.edu"
                            title="Email"
                            type="email"
                            name="user_email"
                            onChange={handleChange}
                            formType="login"
                            fieldsPerLine={1}
                            required={true}
                            validator={email}
                            value={display.user_email ?? ""}
                        />
                        <Field
                            page={1}
                            title="Password"
                            type="password"
                            formType="login"
                            name="user_password"
                            fieldsPerLine={1}
                            required={true}
                            validator={anyString}
                            onChange={handleChange}
                            value={display.user_password ?? ""}
                        />
                        <p
                            onClick={handleClick}
                            className="mx-4 py-3 hover:cursor-pointer font-Poppins text-md text-blue-800 hover:animate-pulse"
                        >
                            Forgot password ?
                        </p>
                    </div>
                    <div className="flex justify-center p-5">
                        <button
                            className="w-[70%] text-white rounded-lg bg-red-700 p-3 hover:bg-red-600"
                            onClick={handleSubmit}
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>

            <Wave
                fill="#b91c1c"
                paused={false}
                className="absolute bottom-0 -z-10"
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
