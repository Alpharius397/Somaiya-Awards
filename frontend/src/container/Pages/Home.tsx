import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Model } from "@/components/Scene";
import { OrbitControls, Environment } from "@react-three/drei";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Lottie from "lottie-react";
import { ErrorBoundary } from "react-error-boundary";
import Certificate from "@/container/assets/certificate.json";
import Money from "@/container/assets/money.json";
import SkyFire from "@/container/assets/skyfire.hdr";
import Trophy from "@/container/assets/trophy.json";
import React from "react";

export default function Home() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/auth/login");
    };

    return (
        <div className="w-full h-screen">
            <Navbar />

            {/* SECTION BANNER */}
            <div className="w-full flex bg-red-800 h-[650px]">
                <div className="w-[40%]">
                    <ErrorBoundary fallback={<p> SOmething </p>}>
                        <Canvas
                            camera={{
                                position: [-1, 0, 4.5],
                                near: 0.1,
                                far: 100,
                            }}
                        >
                            <OrbitControls />
                            {/** @ts-expect-error Thanks r3f for types */}
                            <pointLight
                                position={[0, 10, 0]}
                                intensity={2.0}
                                color="#ffffff"
                            />
                            {/** @ts-expect-error Thanks r3f for types */}
                            <spotLight
                                position={[0, 10, 5]}
                                intensity={5.0}
                                angle={Math.PI / 6}
                                penumbra={0.1}
                                color="#ff9900"
                            />
                            {/** @ts-expect-error Thanks r3f for types */}
                            <directionalLight
                                position={[-10, 5, -5]}
                                intensity={1.5}
                                color="#00ccff"
                            />
                            {/** @ts-expect-error Thanks r3f for types */}
                            <ambientLight intensity={0.5} color="#ffffff" />

                            {/* Environment Map */}
                            {/** @ts-expect-error Thanks r3f for types */}
                            <Environment files={SkyFire} intensity={2} />

                            <Model />
                        </Canvas>
                    </ErrorBoundary>
                </div>

                <div className="w-full text-center">
                    <div className="h-[100%] justify-center flex flex-col items-center">
                        <h2 className="text-white font-Roboto text-5xl">
                            SOMAIYA AWARDS
                        </h2>

                        <h3 className="text-white font-Roboto text-4xl mt-3">
                            {new Date().getFullYear()}
                        </h3>

                        <div
                            onClick={handleClick}
                            className="mt-10 bg-red-600 shadow-md p-5 rounded-full w-72 cursor-pointer hover:bg-red-500"
                        >
                            <p className="font-Poppins text-2xl text-white ">
                                Login
                            </p>
                        </div>
                    </div>
                </div>

                <div className="h-[100%] bg-red-700 w-[150px]"></div>
            </div>

            {/* SECTION OVERVIEW */}
            <div className="p-8">
                <h2 className="text-red-800 font-Roboto text-2xl font-semibold">
                    Overview
                    <hr className="w-[4%] border-slate-300 border-2" />
                </h2>
                <p className="my-3 text-md font-Poppins text-slate-950">
                    The Somaiya Vidyavihar Awards have been instituted to
                    recognize and honor the outstanding contributions and
                    commitment of its Faculty and Staff towards the achievement
                    of the Mission and Vision of the Institute.
                </p>
            </div>

            {/* SECTION Nomenclature */}
            <div className="p-8">
                <h2 className="text-red-800 font-Roboto text-2xl font-semibold">
                    Nomeclature Of Awards
                    <hr className="w-[4%] border-slate-300 border-2" />
                </h2>
                <p className="my-3 text-md font-Poppins text-slate-950">
                    <table className="w-[100%] border-black border-2 text-left divide-y divide-gray-400">
                        <thead className="bg-amber-100">
                            <tr>
                                <th
                                    rowSpan={7}
                                    className="border-black border-2 p-4 text-center"
                                >
                                    Shri. K. J. Somaiya Award
                                </th>
                            </tr>
                            <tr>
                                <td className="p-4">Outstanding College</td>
                            </tr>
                            <tr>
                                <td className="border-black border-2 p-4">
                                    Outstanding Boy Student
                                </td>
                            </tr>
                            <tr>
                                <td className="border-black border-2 p-4">
                                    Student of the Year
                                </td>
                            </tr>
                            <tr>
                                <td className="border-black border-2 p-4">
                                    Employee of the Year
                                </td>
                            </tr>
                            <tr>
                                <td className="border-black border-2 p-4">
                                    Outstanding Employee – K J Somaiya Hospital
                                </td>
                            </tr>
                            <tr>
                                <td className="border-black border-2 p-4">
                                    Outstanding Employee – Somaiya Trust
                                </td>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-400 bg-green-100">
                            <tr>
                                <th
                                    rowSpan={5}
                                    className="border-black border-2 p-4 text-center"
                                >
                                    Smt. Sakarben K. Somaiya Award
                                </th>
                            </tr>
                            <tr>
                                <td className="p-4">
                                    Outstanding Girl Student
                                </td>
                            </tr>
                            <tr>
                                <td className="border-black border-2 p-4">
                                    Outstanding School
                                </td>
                            </tr>
                            <tr>
                                <td className="border-black border-2 p-4">
                                    Promising Employee
                                </td>
                            </tr>
                            <tr>
                                <td className="border-black border-2 p-4">
                                    Promising Teacher
                                </td>
                            </tr>
                        </tbody>
                        <tbody className="divide-y divide-gray-400 bg-blue-100">
                            <tr>
                                <th
                                    rowSpan={3}
                                    className="border-black border-2 p-4 text-center"
                                >
                                    Dr. S. K. Somaiya Award
                                </th>
                            </tr>
                            <tr>
                                <td className="p-4">Excellence in Teaching</td>
                            </tr>
                            <tr>
                                <td className="border-black border-2 p-4">
                                    Excellence in Research
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </p>
            </div>

            {/* SECTION Awards Prizes */}
            <div className="p-8">
                <h2 className="text-red-800 font-Roboto text-2xl font-semibold">
                    Awards Prizes
                    <hr className="w-[4%] border-slate-300 border-2" />
                </h2>
                <ErrorBoundary fallback={<p> Something </p>}>
                    <div className="flex my-7 justify-evenly p-6">
                        <div style={{ width: "200px", height: "200px" }}>
                            <Lottie animationData={Certificate} />
                            <p className="text-center font-Poppins text-sm text-red-800">
                                Certificate of Appreciation
                            </p>
                        </div>
                        <div style={{ width: "200px", height: "200px" }}>
                            <Lottie animationData={Trophy} />
                            <p className="text-center font-Poppins text-sm text-red-800">
                                Souvenir trophy
                            </p>
                        </div>
                        <div style={{ width: "200px", height: "200px" }}>
                            <Lottie animationData={Money} />
                            <p className="text-center font-Poppins text-sm text-red-800">
                                Symbolic financial reward
                            </p>
                        </div>
                    </div>
                </ErrorBoundary>
            </div>

            <Footer />
        </div>
    );
}
