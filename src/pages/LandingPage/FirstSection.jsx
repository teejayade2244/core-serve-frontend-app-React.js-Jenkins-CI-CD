import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

// Remobilization and Login section
export function FirstSection() {
    const [hover, setHover] = useState(false)
    const navigation = useNavigate()

    const toLoginPage = () => {
        navigation("/login")
    }

    return (
        <div>
            <div className="space-y-5 flex flex-col justify-center items-center lg:flex-row xl:flex-row md:justify-evenly xl:mb-5 mb-7">
                <div
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover((prev) => !prev)}
                    className="relative bg-orange-500 font-semibold items-center w-80 p-5 text-center"
                >
                    <div className=" relative hover:bg-[#008000] hover:text-white hover:p-3 transform hover:scale-105 transition duration-500 ease-out">
                        <h2 className="text-white font-bold mb-2 font-sans text-xl cursor-pointer ">
                            Lorem Ipsum,2023 A{" "}
                        </h2>
                        <span className="bg-white text-center text-orange-500 p-1 rounded-[4px]">
                            Ends on 12/03/2025
                        </span>

                        {hover && (
                            <div className="p-2 bg-gray-900 text-white font-sans font-semibold absolute bottom-0 right-80 rounded-md -left-56 w-48">
                                <p className="text-xs">
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-4 items-center flex flex-col">
                    <button
                        onClick={toLoginPage}
                        className="px-3 rounded-md text-2xl text-gray-500 font-semibold xl:text-[20px] cursor-pointer sm:text-[18px]"
                    >
                        Login Here
                    </button>
                    <img
                        className="w-20 h-20"
                        src="https://portal.nysc.org.ng/nysc1/img/homepage-slider/login.png"
                        alt=""
                    />
                </div>
            </div>

            <div className=" border border-[#d3d3d3] xl:p-6 shadow-md mb-8 sm:py-5">
                <div className="text-center p-3">
                    <motion.span
                        variants={{
                            hidden: { opacity: 0, y: 75 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        initial="hidden"
                        animate={"visible"}
                        transition={{
                            duration: 0.5,
                            delay: 0.25,
                            ease: "easeIn",
                        }}
                        className="text-2xl font-serif text-[#000080]"
                    >
                        New: Online Application Lorem Ipsum
                    </motion.span>
                    <Link to={"/apply"}>
                        <h3 className="text-gray-400 text-lg cursor-pointer hover:underline">
                            Apply for Remobilisation
                        </h3>
                    </Link>
                </div>
            </div>
        </div>
    )
}
