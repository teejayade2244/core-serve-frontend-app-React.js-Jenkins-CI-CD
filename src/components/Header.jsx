import React, { useState } from "react"
// import { useTypewriter } from "react-simple-typewriter"
import {
    ArrowDropDown as ArrowDropDownIcon,
    ArrowDropUp as ArrowDropUpIcon,
    Twitter as TwitterIcon,
    Instagram as InstagramIcon,
    Facebook as FacebookIcon,
    Email as EmailIcon,
    Home as HomeIcon,
    Close as CloseIcon,
    Payment as PaymentIcon,
    Call as CallIcon,
} from "@mui/icons-material"
import { BiMenuAltRight } from "react-icons/bi"
import { Link, useLocation } from "react-router-dom"

export function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [toggleSidebar, setToggleSidebar] = useState(false)
    //   const navigation = useNavigate()

    const handleDropDown = () => {
        setIsOpen(!isOpen)
    }
    // const [text] = useTypewriter({
    //     words: [
    //         "Welcome to the NYSC Portal",
    //         "Registration in Progress...",
    //         // 'Read Below For Registration Process'
    //     ],
    //     loop: 1,
    //     delaySpeed: 2000,
    // })
    return (
        <header className="w-full bg-[#fff] z-20">
            {/* Header Top */}
            <div className=" relative md:ml-20 flex sm:h-[70px] sm:flex-row sm:items-center items-start md:items-center space-x-5 flex-col md:flex-row px-5">
                <div className="flex items-center flex-row justify-between space-x-10 ">
                    <a href="./">
                        <img
                            className="cursor-pointer"
                            src="https://portal.nysc.org.ng/nysc1/img/banner1.png"
                            alt="logo"
                        />
                    </a>
                    <div className="relative">
                        <div
                            onClick={() => setToggleSidebar((prev) => !prev)}
                            className="ml-16 md:hidden sm:hidden   "
                        >
                            <BiMenuAltRight className="h-9 w-9 text-black" />
                        </div>
                        {toggleSidebar && (
                            <div className="toogle slide-in-right">
                                <div className="flex self-center flex-shrink-0 justify-end">
                                    <CloseIcon
                                        onClick={() =>
                                            setToggleSidebar((prev) => !prev)
                                        }
                                        className="bg-gray-300 text-black font-bold rounded-full"
                                        sx={{ width: 30, height: 30 }}
                                    />
                                </div>
                                <div className="w-full flex flex-col space-y-7 h-screen mt-3">
                                    <SideBar
                                        title={"Home"}
                                        Icon={HomeIcon}
                                        linkUrl={"/"}
                                    />
                                    <SideBar
                                        title={"Contact Us"}
                                        Icon={CallIcon}
                                        linkUrl={"/home"}
                                    />
                                    <SideBar
                                        title={"Payment Status"}
                                        Icon={PaymentIcon}
                                        linkUrl={"/payment"}
                                    />
                                    <SideBar
                                        title={"Socials"}
                                        Icon={HomeIcon}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="border-none hidden md:flex md:flex-row flex-col items-center sm:inline-flex">
                    <ul className="flex w-94 md:w-64 md:flex-row sm:justify-evenly sm:flex-row sm:p-5 md:py-5 flex-col items-center justify-start">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/Contact">Contact</NavLink>
                        <NavLink to="/Payment">Payment</NavLink>
                    </ul>
                </div>

                <div className="relative">
                    <div className="flex-row space-x-1 items-center hidden sm:block">
                        <button
                            onClick={handleDropDown}
                            className="hover:text-black border-none outline-none hidden sm:hidden lg:inline-flex xl:inline-flex text-gray-400 text-[17px]"
                        >
                            Socials
                            {!isOpen ? (
                                <ArrowDropDownIcon
                                    onClick={handleDropDown}
                                    className="items-center ml-3"
                                />
                            ) : (
                                <ArrowDropUpIcon className="items-center ml-3" />
                            )}
                        </button>
                    </div>

                    {isOpen && (
                        <div className="px-2 bg-gray-300 rounded-md absolute top-12 pt-1 pb-5 z-10 flex flex-col justify-start space-y-3">
                            <SocialList
                                title={"Instagram"}
                                Icon={InstagramIcon}
                                linkUrl={"https://www.instagram.com/"}
                            />
                            <SocialList
                                title={"Twitter"}
                                Icon={TwitterIcon}
                                linkUrl={"https://twitter.com/messages"}
                            />
                            <SocialList
                                title={"Facebook"}
                                Icon={FacebookIcon}
                                linkUrl={"https://www.facebook.com/"}
                            />
                            <SocialList
                                title={"Email"}
                                Icon={EmailIcon}
                                linkUrl={"email"}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Header Bottom */}
            <div className="w-full">
                <div className="border border-x-0 border-t-0 border-[#960000] border-b-[4px]"></div>
                <div className="bg-[#2b943a] p-[10px] w-full">
                    <h1 className="text-white md:ml-20 font-semibold sm:text-3xl text-2xl md:text-3xl font-sans tracking-wide">
                        Welcome to the NYSC Portal{" "}
                        <span className="text-3xl font-sans"></span>
                    </h1>
                </div>
                <div className="border border-x-0 border-t-0 border-[#cdc9e0] border-b-[4px]"></div>
            </div>
        </header>
    )
}

// for social icons and title drop down
function SocialList({ Icon, title, linkUrl }) {
    return (
        <div className="social_list cursor-pointer">
            <h3 className="font-semibold cursor-pointer">
                <a href={linkUrl} target="blank">
                    {title}
                </a>
            </h3>
            {Icon && <Icon />}
        </div>
    )
}

function SideBar({ title, Icon, linkUrl }) {
    return (
        <div className="sidebar_options">
            <Link to={linkUrl}>
                <h2 className="text-[20px] text-black font-bold hover:underline">
                    {title}
                </h2>
            </Link>

            {Icon && <Icon sx={{ width: 25, height: 25 }} />}
        </div>
    )
}

function NavLink({ to, children }) {
    const location = useLocation()

    return (
        <li
            className={`list_items relative nav ${
                location.pathname === to ? "active" : ""
            }`}
        >
            <Link className="links" to={to}>
                {children}
            </Link>
        </li>
    )
}
