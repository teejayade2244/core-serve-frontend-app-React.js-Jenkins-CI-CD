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
        expect(screen.getByText(/Powered by Core serve/i)).toBeInTheDocument()
        expect(
            screen.getByText(/Copyright © 2025 Core Serve/i)
        ).toBeInTheDocument()
        expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument()
        expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument()

        expect(
            screen.getByRole("link", { name: /Powered by Core serve/i })
        ).toHaveAttribute("href", "temitope")
    })
})

