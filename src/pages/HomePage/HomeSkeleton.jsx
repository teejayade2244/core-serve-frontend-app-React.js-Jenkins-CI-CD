import React from "react"
import { FaHandPointRight } from "react-icons/fa"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

const sidebarItems = [
    "My Dashboard",
    "Change Password",
    "Batch Registration",
    "PPA Letter",
    "LGA Clearance",
    "Disciplinary Case",
    "Log Out",
]

const userDetails = [
    { title: "Firstname", details: "" },
    { title: "Lastname", details: "" },
    { title: "Batch", details: "" },
    { title: "Email", details: "" },
    { title: "Phone Number", details: "" },
    { title: "Gender", details: "" },
]

function LayOut() {
    return (
        <div className="bg-[#fff] h-full flex flex-col md:flex-row space-y-28 md:space-y-6">
            <div className="w-full px-3 md:w-[25%] lg:w-[20%] md:px-7 h-[600px] md:h-[800px] md:border-2 md:shadow-lg border-solid border-y-0 border-l-0">
                <div className="mb-10 space-y-2">
                    <h1 className="text-[23px] font-normal font-Belanosima mt-5 rounded-md bg-gray-200 text-gray-200 animate-pulse ">
                        Hello, adebunmi
                    </h1>
                </div>

                <div className="space-y-4">
                    {sidebarItems.map((item, index) => (
                        <SideBar
                            key={index}
                            title={item}
                            Icon={FaHandPointRight}
                        />
                    ))}
                </div>
            </div>

            <div className="w-full h-screen md:mt-10 md:w-[70%] lg:w-[90%]">
                <div className="flex flex-col justify-between md:flex-row mb-10 md:items-center space-y-3">
                    <h2 className="bg-gray-200 rounded-[4px] text-[18px] px-5 w-64 ml-5 text-gray-200 font-semibold text-center animate-pulse">
                        adebunmi33@gmail.com
                    </h2>
                    <h3 className="md:mr-10 ml-[170px] text-[14px] text-gray-200 bg-gray-200 animate-pulse rounded-md">
                        Todays Date: toaday
                    </h3>
                </div>

                <div className="border border-solid border-gray-400 md:w-[96%] mx-5">
                    <h3 className="text-gray-200 bg-gray-200 font-semibold text-[18px] px-3 animate-pulse">
                        Dashboard Basic | Details
                    </h3>
                    <div className="bg-white px-5 mx-5 mt-4 rounded-md">
                        <div className="flex flex-row justify-between">
                            <div className="list-none w-full flex flex-col justify-start py-4 space-y-1 md:space-y-1 md:ml-[40px] lg:ml-[55px]">
                                {userDetails.map((detail, index) => (
                                    <UserDetails
                                        key={index}
                                        title={detail.title}
                                        details={detail.details}
                                    />
                                ))}
                            </div>
                            <div className="hidden md:inline-flex sm:inline-flex sm:mt-3">
                                <AccountCircleIcon
                                    className="text-gray-200 rounded-full animate-pulse bg-gray-200"
                                    sx={{ height: "60px", width: "60px" }}
                                />
                            </div>
                        </div>

                        <h3 className="text-gray-200 rounded-md animate-pulse bg-gray-200 italic mb-3 font-semibold w-full md:text-[14px]">
                            Lorem ipsum, or lipsum as it is sometimes known, is
                            dummy text used in laying out print, graphic or web
                            designs. The passage is attributed to an unknown
                            typesetter in the 15th century
                        </h3>
                        <h3 className="text-gray-200 rounded-md animate-pulse bg-gray-200 italic mb-5 font-semibold md:mb-10 md:text-[14px]">
                            who is thought to have scrambled parts of Cicero's
                            De Finibus Bonorum et Malorum for use in a type
                            specimen book. It usually begins with <br />
                            The purpose of lorem ipsum is to create a natural
                            looking block of text (sentence, paragraph, page,
                            etc.) that doesn't distract from the layout. A
                            practice not without controversy, laying out pages
                            with meaningless filler text can be very useful when
                            the focus is meant to be on design, not content.
                        </h3>

                        <div className="flex items-center flex-col w-full gap-2 p-3 lg:flex-row">
                            <button className=" px-1 py-2 w-full  border border-solid rounded-sm font-bold hover:transform lg:w-32 text-gray-200 animate-pulse bg-gray-200">
                                Print Slip
                            </button>
                            <button className=" px-1 py-2 w-full  border border-solid rounded-sm font-bold hover:transform lg:w-32 text-gray-200 animate-pulse bg-gray-200">
                                Relocation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function UserDetails({ title, details }) {
    return (
        <div className="flex flex-col md:flex-row space-x-3 items-start w-full">
            <h3 className="text-gray-200 animate-pulse border rounded-md bg-gray-200 w-[20%] font-semibold">
                {title}:
            </h3>
            <h4 className="text-gray-200 animate-pulse border bg-gray-200 w-[40%] h-5 font-normal rounded-md text-[15px] ml-0">
                {details}
            </h4>
        </div>
    )
}

function SideBar({ title, Icon, onClick }) {
    const handleClick = () => {
        if (onClick) {
            onClick()
        }
    }
    return (
        <div
            onClick={handleClick}
            className="flex bg-gray-200 items-center gap-3 last:border-b-0 animate-pulse rounded-md border-x-0 border-t-0 border-[#808080] p-2 py-4"
        >
            <h3 className="text-[18px] md:text-[15px] flex-1 bg-gray-200 text-gray-200 animate-pulse rounded-md font-semibold cursor-pointer">
                {title}
            </h3>
        </div>
    )
}

function HomeSkeleton() {
    return (
        <div>
            <LayOut />
        </div>
    )
}

export default HomeSkeleton
