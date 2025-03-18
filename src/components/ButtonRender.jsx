import { useState } from "react"

const RenderButton = () => {
    const [formStep, setFormStep] = useState(0)
    const completeForm = () => {
        setFormStep((current) => current + 1)
    }

    if (formStep > 2) {
        return undefined
    } else if (formStep === 2) {
        return (
            <button
                type="button"
                onClick={completeForm}
                className="px-6 py-2 mt-5 ml-3 text-base font-bold rounded bg-[#2b943a] text-white uppercase transition duration-200 ease-in-out cursor-pointer active:border border-solid active:scale-100"
            >
                Submit
            </button>
        )
    } else {
        return (
            <button
                type="button"
                onClick={completeForm}
                className="px-6 py-2 mt-5 ml-3 text-base font-bold rounded bg-[#2b943a] text-white uppercase transition duration-200 ease-in-out cursor-pointer active:border border-solid active:scale-100"
            >
                Next
            </button>
        )
    }
}
export default RenderButton
