import React from "react"

//   footer section
export function Footer() {
    return (
        <footer className="sticky bottom-0 z-30 hidden md:block">
            <div className="bg-[#314ba9] h-28 md:h-16 lg:h-14 w-full border text-center border-[#960000] border-x-0 border-b-0 border-t-[4px]">
                <div className="text-white mt-5 flex flex-col md:justify-evenly md:flex-row items-center gap-y-5 text-[15px]">
                    <h4>
                        <a
                            className="cursor-pointer hover:underline text-[15px]"
                            href="temitope"
                        >
                            Powered by Core serve{" "}
                        </a>
                    </h4>

                    <div className="text-center">
                        <h4 className="text-[12px]">
                            Copyright © 2025 Core Serve. All
                            rights reserved <span>Privacy Policy</span>
                        </h4>
                    </div>
                </div>
            </div>
        </footer>
    )
}
