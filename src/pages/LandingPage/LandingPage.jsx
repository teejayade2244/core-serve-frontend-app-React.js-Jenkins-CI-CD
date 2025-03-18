import { Header } from "../../components/Header"
import { FirstSection } from "./FirstSection"
import { Footer } from "../../components/Footer"
import { SecondSection } from "./SeconSection"
import { Guidlines } from "./Guidlines"
import { ImportantInfo } from "./ImportantInfoSection"
import Loader from "../../components/Loader"
import { useSelector } from "react-redux"

function LandingPage() {
    const isLoading = useSelector((state) => state.auth.isLoading)

    return (
        <div className="">
            <Header />
            {isLoading ? (
                <Loader />
            ) : (
                <div className="layout">
                    <FirstSection />
                    <SecondSection />
                    <Guidlines />
                    <ImportantInfo />
                </div>
            )}
            <Footer />
        </div>
    )
}

export default LandingPage
