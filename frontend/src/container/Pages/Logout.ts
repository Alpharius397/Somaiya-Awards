import Axios, { URL } from "@/axios";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Logout() {
    const navigate = useNavigate();

    return useCallback(() => {
        Axios.post(URL.AUTH.LOGOUT);

        Swal.fire({
            title: "Successfully Logged Out",
            icon: "success",
            confirmButtonColor: "rgb(185,28,28)",
        });
        // navigate to login page
        navigate("/auth/login");
    }, [navigate]);
}
