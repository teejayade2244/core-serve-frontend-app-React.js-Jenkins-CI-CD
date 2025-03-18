import { createSlice } from "@reduxjs/toolkit"

// Define initial state
const initialState = {
    isSending: false,
    sendSuccess: false,
    sendError: null,
}

// Define slice
const emailSlice = createSlice({
    name: "email",
    initialState,
    reducers: {
        startSending: (state) => {
            state.isSending = true
        },
        sendSuccess: (state) => {
            state.isSending = false
            state.sendSuccess = true
            state.sendError = null
        },
        sendFail: (state, action) => {
            state.isSending = false
            state.sendSuccess = false
            state.sendError = action.payload
        },
    },
})

export const { startSending, sendSuccess, sendFail } = emailSlice.actions

export default emailSlice.reducer
