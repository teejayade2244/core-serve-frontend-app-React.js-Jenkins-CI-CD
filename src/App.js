import React from "react"
import "./App.css"
import LandingPage from "./pages/LandingPage/LandingPage"
import { Route, BrowserRouter, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage/LoginPage"
import MainHomePage from "./pages/HomePage/MainHomePage"
import PaymentPage from "./pages/PaymentPage/PaymentPage"
import SignUpPage from "./pages/Signup/SignUpPage"
import ForgotPassword from "./pages/Forgot Password/ForgotPassword"
import NewPassword from "./pages/New Password/NewPassword"
import ProtectedRoute from "./components/HOC"
import UserProfile from "./pages/UserProfile/UserProfile"
import UpdatePassword from "./pages/Update-password/UpdatePassword"
// import HomeSleteton from "./pages/HomePage/HomeSkeleton"

function App() {
    return (
        <div className="bg-[#fff] h-screen">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signUp" element={<SignUpPage />} />
                    <Route path="/Payment" element={<PaymentPage />} />
                    {/* <Route path="/test" element={<HomeSleteton />} /> */}
                    <Route
                        path="/home"
                        element={<ProtectedRoute component={MainHomePage} />}
                    />
                    <Route
                        path="/user-profile"
                        element={<ProtectedRoute component={UserProfile} />}
                    />

                    <Route
                        path="/update-password"
                        element={<ProtectedRoute component={UpdatePassword} />}
                    />
                    <Route path="/password" element={<ForgotPassword />} />
                    <Route
                        path="/reset-password/:token"
                        element={<NewPassword />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
