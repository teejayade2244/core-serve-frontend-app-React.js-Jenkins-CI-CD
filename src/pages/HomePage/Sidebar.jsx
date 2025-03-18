import React from "react"
import { FaHandPointRight } from "react-icons/fa"
import { motion } from "framer-motion"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../../features/authSlice2"
// import axios from "axios"
// import { base_url } from "../../utils/axiosConfig"

function Sidebar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logOut = async () => {
        localStorage.removeItem("token")
        window.localStorage.removeItem("isLoggedIn")
        console.log("User logged out successfully")
        dispatch(logout())
        navigate("/login")
    }

    const toUserProfile = () => {
        navigate("/user-profile")
    }

    return (
        <motion.div
            className="space-y-4"
            variants={{
                hidden: { opacity: 0, y: 75 },
                visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={"visible"}
            transition={{ duration: 0.5, delay: 0.25 }}
        >
            <SideBar
                onClick={() => navigate("/home")}
                title={"My Dashboard"}
                Icon={FaHandPointRight}
            />
            <SideBar
                onClick={() => navigate("/update-password")}
                title={"Change Password"}
                Icon={FaHandPointRight}
            />
            <SideBar title={"Course Correction"} Icon={FaHandPointRight} />
            <SideBar title={"PPA Letter"} Icon={FaHandPointRight} />
            <SideBar title={"LGA Clearance"} Icon={FaHandPointRight} />
            <SideBar
                title={"User Profile"}
                Icon={FaHandPointRight}
                onClick={toUserProfile}
            />
            <SideBar
                onClick={logOut}
                title={"Log Out"}
                Icon={FaHandPointRight}
            />
        </motion.div>
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
            className="flex items-center gap-3 last:border-b-0 border border-solid border-x-0 border-t-0 border-[#808080] p-2 py-4 "
        >
            {Icon && <Icon className="w-4  h-4 " />}
            <h3 className="text-[18px] md:text-[15px] flex-1 font-semibold cursor-pointer hover:text-red-500">
                {title}
            </h3>
        </div>
    )
}

export default Sidebar
