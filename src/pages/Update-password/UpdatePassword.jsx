import React from "react"
import { Header } from "../../components/Header"
import { useForm } from "react-hook-form"
import Sidebar from "../HomePage/Sidebar"
import { base_url } from "../../utils/axiosConfig"
import axios from "axios"
import { toast } from "react-toastify"
import ToastMsg from "../../components/ToastContainer"


function UpdatePassword() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        getValues,
        reset,
    } = useForm()
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

    const key = {
        Password: watch("Password"),
        confirmPassword: watch("confirmPassword"),
    }

    const { Password } = key

    const onSubmit = async (data) => {
        try {
            const response = await axios.put(`${base_url}user/password`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            toast.success(response.data.message) // Display success notification
            reset() // Reset the form
        } catch (error) {
            toast.error("Error updating password")
            console.error(error)
        }
        console.log(data)
    }

    return (
        <div className="">
            <Header />

            <div className="flex flex-col md:flex-row  md:space-y-6">
                <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="w-full px-3">
                    <h1 className="bg-[#314ba9] text-white font-Belanosima py-2 rounded-md px-5 text-[25px] w-full mb-5">
                        Change Password
                    </h1>

                    <div className="md:ml-40 ">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-y-3"
                        >
                            <div className="flex flex-col gap-y-2">
                                <label className="font-Belanosima font-normal text-[16px]">
                                    Enter Current Password:
                                </label>
                                <input
                                    className="md:w-[30%] w-full outline-none border-2 py-2 px-3 border-gray-300"
                                    type="password"
                                    placeholder="Enter Current Password"
                                    {...register("currentPassword", {
                                        required:
                                            "Current Password is required",
                                        pattern: {
                                            value: PWD_REGEX,
                                            message: "Invalid password format",
                                        },
                                    })}
                                />
                                {errors.currentPassword && (
                                    <p className="italic text-[10px] font-semibold text-red-500 mt-1">
                                        {errors.currentPassword.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <label className="font-Belanosima font-normal text-[16px]">
                                    Enter New Password:
                                </label>
                                <input
                                    className="md:w-[30%] w-full outline-none border-2 py-2 px-3 border-gray-300"
                                    type="password"
                                    placeholder="Enter New Password"
                                    {...register("Password", {
                                        required: "Password is required",
                                        pattern: {
                                            value: PWD_REGEX,
                                            message: "Invalid password format",
                                        },
                                        validate: (value) =>
                                            value !==
                                                getValues("currentPassword") ||
                                            "New password cannot be the same as the current password",
                                    })}
                                />
                                {errors.Password && (
                                    <p className="italic text-[10px] font-semibold text-red-500 mt-1">
                                        {errors.Password.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-y-2">
                                <label className="font-Belanosima font-normal text-[16px]">
                                    Confirm New Password:
                                </label>
                                <input
                                    className="md:w-[30%] w-full outline-none border-2 py-2 px-3 border-gray-300"
                                    type="password"
                                    placeholder="Confirm New Password"
                                    {...register("confirmPassword", {
                                        required:
                                            "Confirm Password is required",
                                        validate: (value) =>
                                            value === Password ||
                                            "Passwords do not match",
                                    })}
                                />
                                {errors.confirmPassword && (
                                    <p className="italic text-[10px] font-semibold text-red-500 mt-1">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="bg-[#314ba9] text-white font-Roboto font-semibold text-[15px] py-2 px-3 md:w-[30%] w-full"
                            >
                                Change Password
                            </button>
                        </form>
                    </div>
                    <ToastMsg />
                </div>
            </div>
        </div>
    )
}

export default UpdatePassword
