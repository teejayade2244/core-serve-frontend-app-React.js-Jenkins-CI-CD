import React from "react"

const InputField = ({
    label,
    register,
    errors,
    name,
    type,
    validation,
    errorMessage,
    placeholder,
}) => (
    <div className="input_container">
        <h3 className="font-Belanosima font-normal text-[16px]">
            {label} <span className="text-red-700 self-center">*</span>
        </h3>
        <input
            placeholder={placeholder}
            className={`input_form font-normal placeholder:text-[12px] placeholder:italic ${
                name === "Password" || name === "confirmPassword" ? "mb-1" : ""
            }`}
            type={type}
            {...register(name, validation)}
        />
        {errors[name] && (
            <p
                className={`italic text-[10px] font-semibold text-red-500 ${
                    name === "Password" || name === "confirmPassword"
                        ? "-mt-3"
                        : ""
                }`}
            >
                {errors[name].message || errorMessage}
            </p>
        )}
    </div>
)

export default InputField
