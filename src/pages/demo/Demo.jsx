// import React from "react"
// import { useForm } from "react-hook-form"

// function Demo() {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm()
//     const onSubmit = (data) => {
//         console.log(data)
//     }
//     const MOBILE_REGEX = /^[0-9]*$/
//     return (
//         <div className="max-w-7xl mx-auto flex justify-center mt-10">
//             <div className="border border-[#f5f5f5] rounded-md shadow-md py-5 px-6 ">
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <h4 className="label_text">Book A Session</h4>
//                     <div >
                       
//                         <select name="Services" id="Services">
//                             <option
//                                 value={"Potrait"}
//                                 className="cursor-pointer px-7 mb-3 font-Belanosima"
//                             >
//                                 Potrait
//                             </option>
//                             <option value={"Duo Session"}>Duo Session</option>
//                             <option value={"Family Session"}>
//                                 Family Session
//                             </option>
//                             <option value={"Campaign Shoot"}>
//                                 Campaign Shoot
//                             </option>
//                             <option value={"Personal Branding"}>
//                                 Personal Branding
//                             </option>
//                         </select>
//                     </div>
//                     <div className="mb-3">
//                         <label className="text" htmlFor="">
//                             Name
//                         </label>
//                         <input
//                             className="input"
//                             type="text"
//                             {...register("name", { required: true })}
//                         />
//                         {errors.name && (
//                             <p className="italic text-[10px] font-semibold mt-3 text-red-500">
//                                 Name is required.
//                             </p>
//                         )}
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="email" className="text">
//                             Email Address
//                         </label>

//                         <input
//                             name="email"
//                             autoComplete="off"
//                             id="email"
//                             className="input"
//                             type="email"
//                             {...register("email", { required: true })}
//                         />
//                         {errors.email && (
//                             <p className="italic text-red-600  font-normal font-fira text-[14px] ">
//                                 Email is required.
//                             </p>
//                         )}
//                     </div>
//                     <div className="mb-3">
//                         <label className="text" htmlFor="title">
//                             Outfit
//                         </label>
//                         <select
//                             className=" mt-3 rounded-full appearance-none w-full bg-white border px-4 py-2 pr-8 outline-none "
//                             name="outfit"
//                             id="outfit"
//                             {...register("outfit")}
//                         >
//                             <option
//                                 value={"One"}
//                                 className="cursor-pointer px-7  mb-3"
//                             >
//                                 One
//                             </option>
//                             <option
//                                 className="cursor-pointer px-7 "
//                                 value={"One"}
//                             >
//                                 Two
//                             </option>
//                         </select>
//                     </div>
//                     <div className="mb-3">
//                         <label className="text" htmlFor="title">
//                             Mobile Number
//                         </label>
//                         <input
//                             className="input"
//                             type="tel"
//                             {...register("mobile", {
//                                 required: "Mobile number is required",
//                                 pattern: {
//                                     value: MOBILE_REGEX,
//                                     message:
//                                         "Invalid mobile number. Please enter numbers only.",
//                                 },
//                             })}
//                         />
//                         {errors.mobile && (
//                             <p className="italic text-[10px] font-semibold text-red-500">
//                                 {errors.mobile.message}
//                             </p>
//                         )}
//                     </div>
//                     <div
//                         className="mb-3
//                     "
//                     >
//                         <label
//                             className="text bg-blue-600 text-white animate-pulse"
//                             htmlFor="Email"
//                         >
//                             Preferred Date
//                         </label>
//                         <input className="input" type="date" />
//                     </div>
//                     <div className="mb-5">
//                         <label htmlFor="email" className="text">
//                             Message(Optional)
//                         </label>

//                         <input
//                             autoComplete="off"
//                             className="input"
//                             type="text"
//                         />
//                     </div>

//                     <div className="flex justify-end mb-3">
//                         <button type="submit" className="login_btn">
//                             Submit
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Demo
