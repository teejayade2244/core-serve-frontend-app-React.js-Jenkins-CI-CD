import React from "react"
import { Link } from "react-router-dom"

// important info section

export function ImportantInfo() {
    return (
        <div>
            <div className="mb-5">
                <h2 className="text-gray-600 font-bold text-2xl border border-[#555555] border-x-0 border-t-0 p-5 border-b-[2px] sm:text-3xl">
                    Important Information
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="info flex flex-col space-y-4">
                    <Link to={"/home"}>
                        <h4 className="sm:text-[17px] cursor-pointer hover:underline">
                            Check Senate List or its equivalents
                        </h4>
                    </Link>
                    <Link to={"/home"}>
                        <h4 className="sm:text-[17px] cursor-pointer hover:underline">
                            View Graduation List
                        </h4>
                    </Link>
                </div>
                <DataThree linkText="Biometric Instructions" linkURL="/home" />
                <DataThree
                    linkText="Accredited Institutions/Programmes"
                    linkURL="accredited"
                />
            </div>
        </div>
    )
}

function DataThree({ linkText, linkURL }) {
    return (
        <div className="info">
            <Link to={linkURL}>
                <h4 className="sm:text-[17px] cursor-pointer hover:underline">
                    {linkText}
                </h4>
            </Link>
        </div>
    )
}
