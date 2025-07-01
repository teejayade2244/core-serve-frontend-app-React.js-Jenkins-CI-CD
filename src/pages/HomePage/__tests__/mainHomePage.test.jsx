import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"
import { BrowserRouter as Router } from "react-router-dom"
import { LayOut } from "../MainHomePage"
import axios from "axios"

const mockStore = configureStore([])

// Mock axios globally for all tests in this file
jest.mock("axios")

beforeEach(() => {
    jest.clearAllMocks()
    axios.get.mockResolvedValue({
        data: {
            firstname: "John",
            lastname: "Doe",
            email: "john.doe@example.com",
            mobile: "1234567890",
            Batch: "A",
            gender: "Male",
            CallUpNumber: "NYSC12345",
            StateCode: "NY123",
            Image: "https://via.placeholder.com/150",
        },
    })
})

beforeAll(() => {
    jest.spyOn(console, "warn").mockImplementation((msg) => {
        if (
            typeof msg === "string" &&
            msg.includes("React Router Future Flag Warning")
        ) {
            return
        }
        // Uncomment to see other warnings
        // console.warn(msg)
    })
})

let warnSpy

beforeAll(() => {
    warnSpy = jest.spyOn(console, "warn").mockImplementation((msg) => {
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
    warnSpy && warnSpy.mockRestore()
})

describe("LayOut Component", () => {
    let store

    beforeEach(() => {
        store = mockStore({
            user: {
                isLoading: false,
                user: {
                    firstname: "John",
                    lastname: "Doe",
                    email: "john.doe@example.com",
                    mobile: "1234567890",
                    Batch: "A",
                    gender: "Male",
                    CallUpNumber: "NYSC12345",
                    StateCode: "NY123",
                    Image: "https://via.placeholder.com/150",
                },
            },
            email: {
                isSending: false,
            },
        })
    })

    it("renders user details correctly", () => {
        render(
            <Provider store={store}>
                <Router>
                    <LayOut />
                </Router>
            </Provider>
        )

        // Refine queries to avoid ambiguity
        expect(screen.getByText("Hello,")).toBeInTheDocument()
        expect(
            screen.getByText("John", { selector: "span.lowercase" }) // Specify the selector to target the correct element
        ).toBeInTheDocument()
        expect(
            screen.getByText("john.doe@example.com", { selector: "h2" })
        ).toBeInTheDocument()
        expect(screen.getByText("Firstname:")).toBeInTheDocument()
        expect(screen.getByTestId("user-firstname")).toHaveTextContent("John") // Use unique data-testid
        expect(screen.getByText("Lastname:")).toBeInTheDocument()
        expect(screen.getByTestId("user-lastname")).toHaveTextContent("Doe") // Use unique data-testid
    })

    it("shows the modal when 'Apply for Correction/Rearrangement of Name' is clicked", () => {
        render(
            <Provider store={store}>
                <Router>
                    <LayOut />
                </Router>
            </Provider>
        )

        const applyButton = screen.getByText(
            "Apply for Correction/Rearrangement of Name"
        )
        fireEvent.click(applyButton)

        expect(
            screen.getByText("Apply for Correction/Rearrangement of Name")
        ).toBeInTheDocument()
    })

    it("renders the loading skeleton when data is loading", () => {
        store = mockStore({
            user: {
                isLoading: true,
                user: null,
            },
        })

        render(
            <Provider store={store}>
                <Router>
                    <LayOut />
                </Router>
            </Provider>
        )

        // Refine query to target specific loading skeleton elements
        expect(
            screen.getByText("Hello, adebunmi", { selector: "h1" })
        ).toBeInTheDocument()
        expect(
            screen.getAllByText((_, element) =>
                element?.classList.contains("animate-pulse")
            ).length
        ).toBeGreaterThan(0)
    })
})
