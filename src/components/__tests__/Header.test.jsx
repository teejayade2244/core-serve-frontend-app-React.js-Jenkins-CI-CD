import React from "react"
import { render, screen } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router-dom"
import { Header } from "../Header"

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
