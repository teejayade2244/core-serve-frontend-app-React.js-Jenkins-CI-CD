import React, { useEffect, useState } from "react"
import "./Modal.css"
import { useForm } from "react-hook-form"
import InputField from "./CustomInput"
import { useDispatch, useSelector } from "react-redux"
import { setUser, setUserLoading, setUserError } from "../features/userSlice"
import axios from "axios"
import { base_url } from "../utils/axiosConfig"
import Loader from "./Loader"
import { toast } from "react-toastify"
import ToastMsg from "../components/ToastContainer"
import { startSending, sendSuccess, sendFail } from "../features/emailSlice"

function Modal({ setOpenModal }) {
    const dispatch = useDispatch()
    const { isSending = false } = useSelector((state) => state.email || {})
    const { user } = useSelector((state) => state.user || {})
    const [successMessage, setSuccessMessage] = useState("")

    useEffect(() => {
        dispatch(setUserLoading(true))
        axios
            .get(`${base_url}user/user-data`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                dispatch(setUser(response.data))
                dispatch(setUserLoading(false))
            })
            .catch((error) => {
                console.error("Error fetching user data:", error)
                dispatch(setUserError("Error fetching user data"))
                dispatch(setUserLoading(false))
            })
    }, [dispatch])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        dispatch(startSending())
        try {
            const response = await axios.post(
                `${base_url}user/send-mail`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            )

            if (response.status === 200) {
                dispatch(sendSuccess())
                toast.success(response.data.message)
                setSuccessMessage(
                    "Dear User, your response has been recorded successfully."
                )
                setTimeout(() => {
                    setSuccessMessage("")
                }, 3000)
            } else {
                throw new Error(response.data.message)
            }
        } catch (err) {
            console.log(err)
            dispatch(sendFail(err.message))
            toast.error("An error occurred")
        }
    }

    const USER_REGEX = /^[A-Za-z]/
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-[1px] flex items-center justify-center z-50"
            role="dialog"
            aria-labelledby="modal-title"
        >
            {isSending ? (
                <Loader />
            ) : user ? (
                <div className="modalContainer rounded-sm shadow-md">
                    <div className="titleCloseBtn">
                        <button
                            aria-label="Close"
                            onClick={() => setOpenModal(false)}
                            className="close-button"
                        >
                            Close
                        </button>
                    </div>
                    <div className="">
                        <h1
                            id="modal-title"
                            className="font-Belanosima font-normal text-[20px] text-center"
                        >
                            Apply for Correction of Names
                        </h1>
                        {successMessage && (
                            <div className="text-green-600 text-center">
                                {successMessage}
                            </div>
                        )}
                    </div>
                    <form
                        className="mt-7 px-2"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="p-2">
                            <label
                                className="font-Belanosima font-normal text-[16px]"
                                htmlFor="Correction"
                            >
                                Select Correction Type
                            </label>
                            <select
                                className="mt-1 rounded-md appearance-none font-normal  w-full bg-white border px-4 py-2 pr-8 outline-none "
                                name="Correction"
                                id="Correction"
                                {...register("Correction", {
                                    required: true,
                                })}
                            >
                                <option
                                    className="text-[12px] md:text-[15px]"
                                    value=""
                                >
                                    Select an option...
                                </option>
                                <option className="cursor-pointer px-7 text-[12px] md:text-[15px] mb-3">
                                    Correct spelling error
                                </option>
                                <option className="cursor-pointer text-[12px] md:text-[15px] px-7">
                                    Name Rearrangement
                                </option>
                            </select>
                            {errors.Correction && (
                                <p className="italic text-[10px] font-semibold  text-red-500 mt-1">
                                    Required.
                                </p>
                            )}
                        </div>

                        <div className="">
                            <div className="flex  flex-col gap-y-2 p-2">
                                <label
                                    className="font-Belanosima font-normal text-[16px]"
                                    htmlFor=""
                                >
                                    Call up Number
                                </label>
                                <input
                                    name="callUpNumber"
                                    className="input_form bg-[#f5f5f5]"
                                    type="text"
                                    value={user.CallUpNumber}
                                    {...register("CallUpNumber", {
                                        required: true,
                                    })}
                                />
                            </div>

                            <div className="flex  flex-col gap-y-2 p-2">
                                <label
                                    className="font-Belanosima font-normal text-[16px]"
                                    htmlFor=""
                                >
                                    ID
                                </label>
                                <input
                                    name="ID"
                                    className="input_form bg-[#f5f5f5]"
                                    type="text"
                                    value={user._id}
                                    {...register("ID", {
                                        required: true,
                                    })}
                                />
                            </div>

                            <div className="flex  flex-col gap-y-2 p-2">
                                <label
                                    className="font-Belanosima font-normal text-[16px]"
                                    htmlFor=""
                                >
                                    Email
                                </label>
                                <input
                                    name="email"
                                    className="input_form bg-[#f5f5f5]"
                                    type="email"
                                    value={user.email || "NA"}
                                    {...register("email", {
                                        required: true,
                                    })}
                                />
                            </div>

                            <div>
                                <h1 className="font-Belanosima font-normal text-[18px] text-center mt-3">
                                    Correction
                                </h1>
                                <InputField
                                    placeholder={
                                        "Input Correct Spelling or Arrangement"
                                    }
                                    label="First Name"
                                    register={register}
                                    errors={errors}
                                    name="FirstName"
                                    type="text"
                                    validation={{
                                        required: "First name is required",
                                        pattern: {
                                            value: USER_REGEX,
                                            message:
                                                "Name must contain letters only",
                                        },
                                    }}
                                />
                                <InputField
                                    placeholder={
                                        "Input Correct Spelling or Arrangement"
                                    }
                                    label="Last Name"
                                    register={register}
                                    errors={errors}
                                    name="LastName"
                                    type="text"
                                    validation={{
                                        required: "Last name is required",
                                        pattern: {
                                            value: USER_REGEX,
                                            message:
                                                "Name must contain letters only",
                                        },
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-x-3 justify-center mt-4">
                            <button
                                className="bg-[#c94040] text-white py-2 px-4 rounded-md"
                                onClick={() => {
                                    setOpenModal(false)
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-[#2E853C] text-white py-2 px-4 rounded-md"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                    <ToastMsg />
                </div>
            ) : (
                <Loader />
            )}
        </div>
    )
}

export default Modal
