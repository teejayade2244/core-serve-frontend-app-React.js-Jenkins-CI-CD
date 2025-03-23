import React, { useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { setUser, setUserLoading, setUserError } from "../../features/userSlice"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { base_url } from "../../utils/axiosConfig"
import Loader from "../../components/Loader"
// import { RxAvatar } from "react-icons/rx"
import Modal from "../../components/Modal"
function UserProfile() {
    const [modalOpen, setModalOpen] = useState(false)
    const dispatch = useDispatch()
    const [message, setMessage] = useState("")
    const [image, setImage] = useState("")
    const [preview, setPreview] = useState("")
    const { isLoading, user } = useSelector((state) => state.user)

    const setProfile = (e) => {
        setImage(e.target.files[0])
    }

    useEffect(() => {
        if (image) {
            setPreview(URL.createObjectURL(image))
        }
    }, [image])

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

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("file", image) // Use "file" as the field name

        try {
            const response = await axios.post(
                `${base_url}user/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            setMessage(response.data)
        } catch (error) {
            console.error("Error:", error)
        }
    }

    return (
        <div>
            {modalOpen && <Modal setOpenModal={setModalOpen} />}
            <Header />
            {isLoading ? (
                <Loader />
            ) : user ? (
                <div className="bg-[#f5f5f5]">
                    <div className="flex flex-col lg:flex-row px-2 py-2 max-w-7xl mx-auto gap-x-10">
                        <div className="border py-5 px-5 w-full lg:w-[50%] bg-[#FFFFFF]/30 rounded-lg shadow-md">
                            <div className="bg-[#314ba9] py-1 px-3 rounded-md mb-3 md:mx-2">
                                <h1 className="text-white font-Roboto text-[18px] uppercase">
                                    User Profile
                                </h1>
                            </div>
                            <div className="flex md:flex-row flex-col gap-x-3">
                                <div className="md:w-[50%]">
                                    <UserDetails
                                        title={"First Name"}
                                        details={user.firstname || "NA"}
                                    />
                                </div>

                                <div className="md:w-[50%]">
                                    <UserDetails
                                        title={"Last Name"}
                                        details={user.lastname || "NA"}
                                    />
                                </div>
                            </div>

                            <div className="flex md:flex-row flex-col gap-x-3">
                                <div className="md:w-[50%]">
                                    <UserDetails
                                        title={"Status"}
                                        details={user.status || "NA"}
                                    />
                                </div>

                                <div className="md:w-[50%]">
                                    <UserDetails
                                        title={"Address"}
                                        details={user.address || "NA"}
                                    />
                                </div>
                            </div>

                            <div className="flex md:flex-row flex-col gap-x-3">
                                <div className="md:w-[50%]">
                                    <UserDetails
                                        title={"Gender"}
                                        details={user.gender || "NA"}
                                    />
                                </div>

                                <div className="md:w-[50%]">
                                    <UserDetails
                                        title={"State of Origin"}
                                        details={user.stateOfOrigin || "NA"}
                                    />
                                </div>
                            </div>

                            <div className="flex md:flex-row flex-col gap-x-3">
                                <div className="md:w-[50%]">
                                    <UserDetails
                                        title={"School"}
                                        details={user.school || "NA"}
                                    />
                                </div>

                                <div className="md:w-[50%]">
                                    <UserDetails
                                        title={"Course of Study"}
                                        details={user.course || "NA"}
                                    />
                                </div>
                            </div>

                            <UserDetails
                                title={"Matric Number"}
                                details={user.matric || "NA"}
                            />

                            <UserDetails
                                title={"Qualification"}
                                details={user.qualification || "NA"}
                            />

                            <UserDetails
                                title={"Year of Graduation"}
                                details={user.to || "NA"}
                            />

                            <UserDetails
                                title={"PPA"}
                                details={user.PPA || "NA"}
                            />

                            <UserDetails
                                title={"CALL UP NUMBER"}
                                details={user.CallUpNumber || "NA"}
                            />
                        </div>

                        <div className="bg-[#f5f5f5] lg:w-[40%] border mt-3 md:mt-0 rounded-md px-5 py-3">
                            <h2 className="font-Roboto">
                                If the spelling/arrangement shown is incorrect,{" "}
                                <span
                                    onClick={() => {
                                        setModalOpen(true)
                                    }}
                                    className="hover:underline cursor-pointer text-blue-600"
                                >
                                    Apply for Correction/Rearrangement of Name
                                </span>
                            </h2>

                            <div className="border px-5 py-3 mt-5 bg-[#f5f5f5]">
                                <p className="font-Roboto text-[15px]">
                                    You've Been Posted to
                                </p>
                                <p className="text-[#3C763D]">
                                    <span className="font-Belanosima text-black">
                                        Orientation Camp: {""}
                                    </span>
                                    {user.OrientationCamp || "NA"} <br />
                                </p>
                                <p className="text-[#3C763D] mt-3">
                                    <span className="font-Belanosima text-black">
                                        State: {""}
                                    </span>
                                    {user.statePostedTo || "NA"}
                                </p>
                            </div>
                            <form onSubmit={handleSubmit} className="mt-3">
                                <div className="md:flex justify-end">
                                    <img
                                        src={preview ? preview : user.Image}
                                        alt=""
                                        className="h-28 w-28 object-cover rounded-full"
                                    />
                                    {/* <RxAvatar className="h-28 w-28 " /> */}
                                </div>
                                <h1 className=" font-Roboto">
                                    Upload your Profile Picture Here
                                </h1>
                                <input
                                    className="mt-2 font-Belanosima"
                                    type="file"
                                    onChange={setProfile}
                                />
                                <button className="bg-[#3C763D] py-1 px-3 mt-3 text-white text-[12px]">
                                    Upload
                                </button>
                            </form>
                            <div>{message}</div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No user data available.</p>
            )}
        </div>
    )
}

function UserDetails({ title, details }) {
    return (
        <div className="mb-3">
            <h2 className="font-Belanosima mb-1 text-[17px]">{title}</h2>
            <p className="bg-gray-300 text-black py-1 px-3 rounded-md text-[14px] uppercase">
                {details}
            </p>
        </div>
    )
}

export default UserProfile
