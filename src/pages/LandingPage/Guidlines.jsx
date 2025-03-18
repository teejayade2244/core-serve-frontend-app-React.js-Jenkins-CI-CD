import React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
//guidlines section
export function Guidlines() {
    return (
        <div>
            <div className="mb-4">
                <h1 className="text-gray-600 font-bold text-3xl border border-[#555555] border-x-0 border-t-0 p-5 border-b-[2px]">
                    Guidelines
                </h1>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0, x: 100 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-2"
            >
                <DataTwo
                    title={"Foreign P.C.M Requirements"}
                    imageSrc={
                        "https://portal.nysc.org.ng/nysc1/img/foreign-graduates.png"
                    }
                    linkUrl={"#foreign"}
                />

                <DataTwo
                    title={"Guidelines on Payment"}
                    imageSrc={
                        "https://portal.nysc.org.ng/nysc1/img/remitapayment.png"
                    }
                    linkUrl={"#guidlines"}
                />

                <DataTwo
                    title={"Change of Date of Birth"}
                    imageSrc={
                        "https://portal.nysc.org.ng/nysc1/img/calendar.png"
                    }
                    linkUrl={"#change"}
                />

                <DataTwo
                    title={"F.A.Qs"}
                    imageSrc={"https://portal.nysc.org.ng/nysc1/img/faq.png"}
                    linkUrl={"#faq"}
                />
            </motion.div>
        </div>
    )
}

function DataTwo({ title, imageSrc, linkUrl }) {
    return (
        <div className="template_two">
            <Link to={linkUrl}>
                <h2 className="sm:text-[17px]">{title}</h2>
            </Link>

            <img className="w-16 h-16" src={imageSrc} alt="" />
        </div>
    )
}
