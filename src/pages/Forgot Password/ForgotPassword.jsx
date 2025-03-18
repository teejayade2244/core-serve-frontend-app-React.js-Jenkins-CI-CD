import MailIcon from "@mui/icons-material/Mail"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import {
    forgotPasswordRequested,
    forgotPasswordSuccess,
    forgotPasswordFailed,
} from "../../features/forgotPassword"
import { base_url } from "../../utils/axiosConfig"
import { toast } from "react-toastify"
import ToastMsg from "../../components/ToastContainer"
import Loader from "../../components/Loader"

function ForgotPassword() {
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.forgotPassword)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()


    
    const onSubmit = async (data) => {
        try {
            dispatch(forgotPasswordRequested())

            const response = await axios.post(
                `${base_url}user/forgot-password-token`,
                data
            )

            if (response.status === 200 && response.data.successMessage) {
                dispatch(forgotPasswordSuccess(response.data.successMessage))
                toast.success(response.data.successMessage)
            } else if (response.status === 404) {
                dispatch(forgotPasswordFailed("User not found"))
                toast.error("User not found") // Show error toast
            } else {
                dispatch(forgotPasswordFailed("Something went wrong."))
                toast.error("Something went wrong.") // Show error toast
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                dispatch(forgotPasswordFailed("User not found"))
                toast.error("User not found") // Show error toast
            } else {
                dispatch(forgotPasswordFailed("Something went wrong."))
                toast.error("Something went wrong.") // Show error toast
            }
            console.log(error)
        }
    }

    return (
        <div className="relative h-screen overflow-hidden flex justify-center space-y-5 bg-[#f5f5f5]">
            {loading ? (
                <Loader />
            ) : (
                <div className="absolute z-10 flex flex-col items-center justify-center mt-20">
                    <Link to={"/"}>
                        <img
                            className="sm:mb-5 cursor-pointer"
                            src="https://portal.nysc.org.ng/nysc1/img/banner1.png"
                            alt=""
                        />
                    </Link>

                    <div className="p-5 mx-3 rounded-xl bg-white md:w-[70%] lg:w-[70%] shadow-md">
                        <h1 className="p-3 rounded-md text-xl text-center bg-[#979aaa] font-sans font-bold">
                            Retrive Your Password
                        </h1>
                        <h2 className="text-center mt-5 text-[13px] font-sans font-semibold text-black mb-4">
                            Please enter the email associated with your account
                            to retrieve your password securely
                        </h2>
                        <form className="" onSubmit={handleSubmit(onSubmit)}>
                            <div className="login">
                                <MailIcon />
                                <label htmlFor="email" className="login_text">
                                    Email Address
                                </label>
                            </div>
                            <input
                                placeholder="Enter Your Email"
                                name="email"
                                autoComplete="off"
                                id="email"
                                className="w-full py-2 px-3 rounded-md  outline-none mt-3  border border-gray-300 mb-7"
                                type="email"
                                {...register("email", { required: true })}
                            />
                            {errors.email && (
                                <p className="italic text-red-600 -mt-6 mb-4 font-normal font-Roboto text-[10px] ">
                                    Email is required.
                                </p>
                            )}
                            <div>
                                <button
                                    type="submit"
                                    className="bg-[#2B943A] text-white text-center w-full py-2 mt-5 rounded-md font-semibold font-sans cursor-pointer"
                                >
                                    Send Email
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

export default ForgotPassword
