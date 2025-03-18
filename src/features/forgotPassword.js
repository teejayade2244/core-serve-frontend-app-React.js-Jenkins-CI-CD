import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    error: null,
    successMessage: null,
}

const forgotPasswordSlice = createSlice({
    name: "forgotPassword",
    initialState,
    reducers: {
        forgotPasswordRequested: (state) => {
            state.loading = true
            state.error = null
            state.successMessage = null
        },
        forgotPasswordSuccess: (state, action) => {
            state.loading = false
            state.successMessage = action.payload
        },
        forgotPasswordFailed: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        clearforgotPasswordState: (state) => {
            state.loading = false
            state.error = null
            state.successMessage = null
        },
    },
})

export const {
    forgotPasswordRequested,
    forgotPasswordSuccess,
    forgotPasswordFailed,
    clearforgotPasswordState,
} = forgotPasswordSlice.actions

export default forgotPasswordSlice.reducer
