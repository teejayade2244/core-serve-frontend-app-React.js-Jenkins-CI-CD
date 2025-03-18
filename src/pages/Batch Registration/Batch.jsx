// import Loader from "../../components/Loader"
import Registration from "./Registration"
import Instruction from "./Instruction"
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"

function Batch() {
    return (
        <div>
            <Header />
            <div className="py-3 px-4 lg:py-9 lg:px-10">
                <div className="max-w-7xl mx-auto flex md:gap-x-5 lg:gap-x-16 md:px-5 py-5">
                    <Instruction />
                    <Registration />
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Batch
