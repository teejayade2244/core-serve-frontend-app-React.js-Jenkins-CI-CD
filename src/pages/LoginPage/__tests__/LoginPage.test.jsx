import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"
import { BrowserRouter as Router } from "react-router-dom"
import LoginPage from "../LoginPage"

// Mock IntersectionObserver
beforeAll(() => {
    global.IntersectionObserver = class {
        constructor() {}
        observe() {}
        unobserve() {}
        disconnect() {}
    }
})

const mockStore = configureStore([])

describe("LoginPage", () => {
    let store

    beforeEach(() => {
        store = mockStore({
            auth: {
                isLoading: false,
            },
        })
    })

    it("renders login form", () => {
        render(
            <Provider store={store}>
                <Router>
                    <LoginPage />
                </Router>
            </Provider>
        )

        expect(screen.getByText(/Login to your Account/i)).toBeInTheDocument()
    })

    it("renders the LoginPage correctly", () => {
        render(
            <Provider store={store}>
                <Router>
                    <LoginPage />
                </Router>
            </Provider>
        )

        expect(screen.getByText(/Login to your Account/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/@.com/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument()
        expect(
            screen.getByRole("button", { name: /Resume/i })
        ).toBeInTheDocument()
    })

    it("displays validation errors when fields are empty", async () => {
        render(
            <Provider store={store}>
                <Router>
                    <LoginPage />
                </Router>
            </Provider>
        )

        const submitButton = screen.getByRole("button", { name: /Resume/i })
        fireEvent.click(submitButton)

        expect(
            await screen.findByText(/Email is required./i)
        ).toBeInTheDocument()
        expect(
            await screen.findByText(/Password is required./i)
        ).toBeInTheDocument()
    })

    it("handles user input correctly", () => {
        render(
            <Provider store={store}>
                <Router>
                    <LoginPage />
                </Router>
            </Provider>
        )

        const emailInput = screen.getByPlaceholderText(/@.com/i)
        const passwordInput = screen.getByLabelText(/Password/i)

        fireEvent.change(emailInput, { target: { value: "test@example.com" } })
        fireEvent.change(passwordInput, { target: { value: "Password123!" } })

        expect(emailInput.value).toBe("test@example.com")
        expect(passwordInput.value).toBe("Password123!")
    })

    it("displays loading state when isLoading is true", () => {
        store = mockStore({
            auth: {
                isLoading: true,
            },
        })

        render(
            <Provider store={store}>
                <Router>
                    <LoginPage />
                </Router>
            </Provider>
        )

        // Check for the presence of the loader component
        expect(screen.getByRole("status")).toBeInTheDocument()
    })
})
