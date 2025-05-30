import React from "react"
import { render, screen } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router-dom"
import { Footer } from "../Footer"

describe("Footer Component", () => {
    it("renders the Footer correctly", () => {
        render(
            <Router>
                <Footer />
            </Router>
        )

        expect(screen.getByText(/Powered by TEMITOPE/i)).toBeInTheDocument()
        expect(
            screen.getByText(/Copyright © 2023 Core Serve/i)
        ).toBeInTheDocument()
        expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument()
    })
})
