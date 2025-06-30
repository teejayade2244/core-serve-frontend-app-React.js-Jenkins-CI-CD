import React from "react"
import { render, screen } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router-dom"
import { Footer } from "../Footer"

// Suppress React Router v7 future flag warnings in tests
beforeAll(() => {
    jest.spyOn(console, "warn").mockImplementation((msg) => {
        if (
            typeof msg === "string" &&
            (
                msg.includes("React Router Future Flag Warning") ||
                msg.includes("Relative route resolution within Splat routes is chaanging in v7")
            )
        ) {
            return
        }
        // Uncomment to see other warnings
        // console.warn(msg)
    })
})

afterAll(() => {
    console.warn.mockRestore()
})

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

