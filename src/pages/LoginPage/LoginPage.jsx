import React, { useState } from "react"
import MailIcon from "@mui/icons-material/Mail"
import LockIcon from "@mui/icons-material/Lock"
import { useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../features/authSlice2"
import axios from "axios"
import { base_url } from "../../utils/axiosConfig"
import { toast } from "react-toastify"
import Loader from "../../components/Loader"
import ToastMsg from "../../components/ToastContainer"
import { MdOutlineRemoveRedEye } from "react-icons/md"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import logo from "../../components/Preview.png"
// import Loader from "../../components/Loader"

function LoginPage() {
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)
    //react-hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()
    const isLoading = useSelector((state) => state.auth.isLoading) // Access isLoading from Redux store

    //login api
    const onSubmit = (data) => {
        axios
            .post(`${base_url}user/login`, data)
            .then(async (response) => {
                toast.success("Login Successful", {
                    position: toast.POSITION.TOP_RIGHT,
                })
                if (response.status && response.status === 200) {
                    localStorage.setItem("token", response.data.token)
                    window.localStorage.setItem("isLoggedIn", true)
                }
                setTimeout(() => {
                    navigate("/home")
                }, 1000)

                dispatch(login(data))
                console.log(response)
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    toast.error("Invalid Email or Password", {
                        position: toast.POSITION.TOP_CENTER,
                    }) // Notify error using toast
                } else {
                    console.log(error)
                }
            })
        console.log(data)
    }

    return (
        <div
            className="relative h-screen overflow-hidden flex justify-center space-y-5 bg-cover bg-center bg-no-repeat bg-opacity-60"
            style={{ backgroundImage: 'url("../images/imageone.jpg")' }}
        >
            {isLoading ? (
                <Loader />
            ) : (
                <div className="absolute z-10 flex flex-col items-center justify-center mt-5">
                    <Link to={"/"}>
                        <img
                            className="sm:mb-5 h-24 w-auto cursor-pointer"
                            src={logo}
                            alt=""
                        />
                    </Link>
                    <div className="p-5 mx-3 rounded-xl bg-white shadow-md md:w-[70%] lg:w-[70%]">
                        <h1 className="p-3 rounded-md text-xl bg-[#979aaa] font-sans font-bold">
                            Login to your Account
                        </h1>
                        <h2 className="text-center mt-5 text-[16px] font-sans font-semibold text-black mb-6">
                            Get started with our app, just create an account and
                            enjoy the experience.
                        </h2>
                        <form className="" onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-y-3">
                                <div className="login">
                                    <MailIcon />
                                    <label
                                        htmlFor="email"
                                        className="login_text"
                                    >
                                        Email Address
                                    </label>
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    autoComplete="off"
                                    className="w-full py-2 px-3 rounded-md outline-none border border-gray-300"
                                    type="email"
                                    placeholder="@.com"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && (
                                    <p className="italic text-red-600 mt-[2px] font-normal text-[10px]">
                                        Email is required.
                                    </p>
                                )}
                                <div className="login">
                                    <LockIcon />
                                    <label
                                        htmlFor="Password"
                                        className="login_text"
                                    >
                                        Password
                                    </label>
                                </div>
                                <div className="flex items-center justify-between w-full rounded-md outline-none px-2 border border-gray-300">
                                    <input
                                        id="Password"
                                        name="Password"
                                        className="w-full py-2 px-3 rounded-md outline-none"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        {...register("Password", {
                                            required: true,
                                        })}
                                    />
                                    {showPassword ? (
                                        <MdOutlineRemoveRedEye
                                            onClick={() =>
                                                setShowPassword((prev) => !prev)
                                            }
                                            className="h-5 w-7"
                                        />
                                    ) : (
                                        <AiOutlineEyeInvisible
                                            onClick={() =>
                                                setShowPassword((prev) => !prev)
                                            }
                                            className="h-5 w-7"
                                        />
                                    )}
                                </div>
                                {errors.Password && (
                                    <p className="italic text-red-600 font-normal text-[10px]">
                                        Password is required.
                                    </p>
                                )}
                            </div>
                            <div className="flex justify-end mb-3 mt-5">
                                <button
                                    type="submit"
                                    className="login_btn"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Logging in..." : "Resume"}
                                </button>
                            </div>
                            <div className="flex space-x-3 items-center text-[13px] font-semibold text-black mb-2">
                                <h3>Not a Member?</h3>

                                <h4 className="hover:underline">
                                    <a href="./signUp"> Create an Account</a>
                                </h4>
                            </div>
                            <div
                                onClick={() => navigate("/password")}
                                className="text-[15px] w-44 cursor-pointer"
                            >
                                <h4 className="font-semibold tex-white hover:underline text-[13px]  font-Roboto cursor-pointer">
                                    Forgot Password ?
                                </h4>
                            </div>
                            <ToastMsg />
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LoginPage
