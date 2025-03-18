import React from "react"
import { render, screen } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router-dom"
import { Header } from "../Header"

describe("Header Component", () => {
    it("renders the Header correctly", () => {
        render(
            <Router>
                <Header />
            </Router>
        )

        expect(screen.getByRole("banner")).toBeInTheDocument()
        expect(screen.getByText(/Home/i)).toBeInTheDocument()
        expect(screen.getByText(/Contact/i)).toBeInTheDocument()
        expect(screen.getByText(/Payment/i)).toBeInTheDocument()
    })
})
