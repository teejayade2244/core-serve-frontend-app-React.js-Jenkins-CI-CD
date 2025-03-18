import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import userReducer from "../features/userSlice"
import authReducer from "../features/authSlice2"
import forgotPasswordReducer from "../features/forgotPassword"
import changePasswordReducer from "../features/changePassword"
import emailReducer from "../features/emailSlice"


const persistConfig = { key: "root", storage, whitelist: ["auth"] }

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    changePassword: changePasswordReducer,
    email: emailReducer,

})

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({ reducer: persistedReducer })
export const persistor = persistStore(store)

// import { configureStore } from "@reduxjs/toolkit"
// import userReducer from "../features/userSlice"
// import authReducer from "../features/authSlice2"
// import forgotPasswordReducer from "../features/forgotPassword"
// import changePasswordReducer from "../features/changePassword"
// export const store = configureStore({
//     reducer: {
//         auth: authReducer,
//         user: userReducer,
//         forgotPassword: forgotPasswordReducer,
//         changePassword: changePasswordReducer,
//     },
// })
