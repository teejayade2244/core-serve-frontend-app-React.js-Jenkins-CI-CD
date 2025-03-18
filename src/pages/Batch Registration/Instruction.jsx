import React from "react"
import { guidelines } from "../../constants/constants"
import { guidlines2 } from "../../constants/constants"

function Instruction() {
    return (
        <div className="lg:w-[40%] md:w-[50%] hidden md:flex flex-col">
            <img
                className="h-20 w-full object-contain hidden md:inline-flex rounded-md"
                src="https://portal.nysc.org.ng/nysc1/img/banner1.png"
                alt="banner"
            />
            <div>
                <p className="font-Roboto text-[14px] mt-7 mb-7">
                    The National Youth Service Corps (NYSC) is a one-year
                    program for college graduates below 30 years old. This
                    program is meant to instill discipline in young people and
                    teach them to be patriotic and loyal to their nation.
                </p>

                <h1 className="text-[25px] font-Belanosima">
                    NYSC registration guidelines
                </h1>

                <p>
                    Lorem ipsum, or lipsum as it is sometimes known, is dummy
                    text used in laying out print, graphic or web designs. The
                    passage is attributed to an unknown typesetter in the 15th
                    century who is thought to have scrambled parts of Cicero's
                    De Finibus Bonorum et Malorum for use in a type specimen
                    book. It usually begins with:
                </p>

                <ul className="mt-5">
                    {guidlines2.map((item, index) => (
                        <li key={index} className="list-disc mb-3">
                            {item}
                        </li>
                    ))}
                </ul>

                <h1 className="text-[25px] font-Belanosima mt-5">
                    Requirements for NYSC registration
                </h1>

                <p className="font-Roboto text-[14px] mt-7 mb-7">
                    To ensure a smooth registration process, prospective corps
                    members must meet the following NYSC registration
                    requirements:
                </p>
                <ul>
                    {guidelines.map((item, index) => (
                        <li key={index} className="list-disc mb-3">
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Instruction
