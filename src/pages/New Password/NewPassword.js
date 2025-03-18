import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../components/Loader"
import {
    changePasswordStart,
    changePasswordSuccess,
    changePasswordFailure,
} from "../../features/changePassword"
import axios from "axios"
import { base_url } from "../../utils/axiosConfig"
import { toast } from "react-toastify"
import ToastMsg from "../../components/ToastContainer"

function NewPassword() {
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.changePassword)
    const location = useLocation()
    const getToken = location.pathname.split("/")[2]
    console.log(getToken)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

    const key = {
        Password: watch("Password"),
        confirmPassword: watch("confirmPassword"),
    }

    const { Password } = key
    const { token } = useParams()
    const onSubmit = async (data) => {
        dispatch(changePasswordStart())
        try {
            const response = await axios.post(
                `${base_url}user/reset-password/${token}`,
                {
                    Password: data.Password,
                    token: token,
                }
            )
            if (response.status === 200) {
                dispatch(changePasswordSuccess())
                toast.success("Password reset successful")
                setTimeout(() => {
                    navigate("/login")
                }, 2000)
            } else {
                throw new Error("Password reset failed")
            }
        } catch (err) {
            console.log(err)
            dispatch(changePasswordFailure(err.message))
            toast.error("Password reset failed")
        }
    }

    return (
        <div className="relative h-screen overflow-hidden flex justify-center space-y-5 bg-[#f5f5f5]">
            {loading ? (
                <Loader />
            ) : (
                <div className="absolute z-10 flex flex-col items-center justify-center mt-7">
                    <Link to={"/"}>
                        <img
                            className="sm:mb-5 cursor-pointer"
                            src="https://portal.nysc.org.ng/nysc1/img/banner1.png"
                            alt=""
                        />
                    </Link>

                    <div className="p-5 mx-3 rounded-xl bg-white shadow-md md:w-[70%] lg:w-[70%]">
                        <h1 className="py-2 px-3 rounded-md text-xl font-Roboto text-center bg-[#979aaa] font-sans font-bold">
                            Reset Your Password
                        </h1>
                        <h2 className="text-center mt-5 text-[16px] font-sans font-semibold text-black mb-4">
                            Please enter your new password to complete the
                            password reset process.
                        </h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-y-5">
                                <input
                                    name="Password"
                                    placeholder="Enter a New Password"
                                    autoComplete="off"
                                    id="Password"
                                    className="w-full py-2 px-3 rounded-md outline-none  border border-gray-300"
                                    type="password"
                                    {...register("Password", {
                                        pattern: {
                                            value: PWD_REGEX,
                                            message: "Invalid password format",
                                        },
                                        required: "Password is required",
                                    })}
                                />
                                {errors.Password && (
                                    <p className="italic text-red-600 font-normal font-fira text-[10px]">
                                        {errors.Password.message}
                                    </p>
                                )}

                                <input
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    autoComplete="off"
                                    id="confirm Password"
                                    className="w-full py-2 px-3 rounded-md  outline-none  border border-gray-300"
                                    type="password"
                                    {...register("confirmPassword", {
                                        validate: (value) =>
                                            value === Password ||
                                            "Passwords do not match",
                                        required:
                                            "Confirm Password is required",
                                    })}
                                />
                                {errors.confirmPassword && (
                                    <p className="italic text-red-600 font-normal font-fira text-[10px]">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="bg-[#2B943A] text-white text-center w-full py-2 rounded-md font-semibold font-sans cursor-pointer mt-7 "
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                    <ToastMsg />
                </div>
            )}
        </div>
    )
}

export default NewPassword
