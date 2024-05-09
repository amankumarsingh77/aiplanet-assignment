
import GoogleIcon from "../assets/google.svg";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginDemo = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const user_id = localStorage.getItem("user_id");
        if (user_id) {
            navigate("/dashboard");
        }
    })
    const login = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const res = await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers: {
                            Authorization: `Bearer ${response.access_token}`,
                        },
                    }
                );
                if (res.data) {
                    const resp = await axios.post(
                        `${import.meta.env.VITE_API_URL}/register`,
                        {
                            name: res.data.name,
                            email: res.data.email,
                            picture: res.data.picture
                        }
                    );
                    if (resp.data.status == "success") {
                        localStorage.setItem("user_id", resp.data.user_id);
                        navigate("/dashboard");
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
    })

    return (
        <div className="flex bg-black">
            <div className="w-full md:w-2/5 bg-white flex justify-center items-center h-screen max-sm:hidden max-md:hidden">
                <div>
                    <h1 className="text-4xl font-bold mb-4 text-black">OpenAGI Assignment</h1>
                    <div className="grid grid-cols-3 gap-4">
                        {[...Array(9)].map((_, index) => (
                            <div key={index} className="opacity-50">
                                <i className="fas fa-arrow-down fa-3x"></i>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full h-screen md:w-3/5 bg-green-400 flex justify-center items-center">
                <div className="w-full max-w-md">
                    <div className="p-5">
                        <h2 className="text-2xl font-semibold mb-2 text-white text-center">Log In</h2>
                    </div>
                    <div className=" mb-4  justify-center py-1 sm:px-6 lg:px-8 ">
                        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                            <div className="bg-white py-12 px-4 shadow sm:rounded-lg sm:px-10">
                                <div className="flex flex-col items-center justify-center gap-4">
                                    <p className="font-normal text-2xl text-gray-900">Welcome</p>

                                    <p className="font-light text-sm text-gray-600">Log in to continue to OpenAGI.</p>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center items-center gap-2 py-3 px-4 border rounded font-light text-md text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 "
                                        onClick={() => login()}
                                    >
                                        <img src={GoogleIcon} className="w-5 h-5 mr-2" alt="Google Icon" width={25} height={25} />
                                        Continue with Google
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default LoginDemo;