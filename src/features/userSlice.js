import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    isLoggedIn: false,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            state.isLoggedIn = true
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.message = "User data loaded successfully."
        },
        setUserLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setUserError: (state, action) => {
            state.isError = true
            state.isLoading = false
            state.message = action.payload
        },
    },
})

export const { setUser, setUserLoading, setUserError } = userSlice.actions

export default userSlice.reducer
