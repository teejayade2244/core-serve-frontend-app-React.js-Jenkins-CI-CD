import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"
import Modal from "../Modal"

const mockStore = configureStore([])

describe("Modal Component", () => {
    let store
    const mockSetOpenModal = jest.fn()

    beforeEach(() => {
        store = mockStore({
            email: { isSending: false },
            user: { user: { firstname: "John", lastname: "Doe" } },
        })

        render(
            <Provider store={store}>
                <Modal setOpenModal={mockSetOpenModal} />
            </Provider>
        )
    })

    it("renders the Modal correctly", () => {
        expect(screen.getByRole("dialog")).toBeInTheDocument()
        expect(
            screen.getByText(/Apply for Correction of Names/i)
        ).toBeInTheDocument()
        expect(
            screen.getByLabelText(/Select Correction Type/i)
        ).toBeInTheDocument()
    })

    it("closes the Modal when the close button is clicked", () => {
        const closeButton = screen.getByRole("button", { name: /Close/i })
        fireEvent.click(closeButton)

        expect(mockSetOpenModal).toHaveBeenCalledWith(false)
    })
})
