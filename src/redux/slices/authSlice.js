import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import $axios from "../../axios/axios";

const initialState = {
    auth: false,
    userName: "",
    authLoadingStatus: "idle",
}

export const login = createAsyncThunk(
    "auth/login",
    (userData) => {
        return $axios.post("login", userData);
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: state => {
            state.auth = false;
            state.userName = "";
            localStorage.clear();
        },
        authMe: state => {
            state.auth = true;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(login.pending, state => {
                state.authLoadingStatus = "loading";
            })
            .addCase(login.fulfilled, (state, action) => {
                state.userName = action.payload.data.data.username;
                state.auth = true;
                state.accessToken = action.payload.data.data.accessToken;
                localStorage.setItem("accessToken", action.payload.data.data.accessToken);
                state.authLoadingStatus = "idle";
            })
            .addCase(login.rejected, state => {
                state.authLoadingStatus = "error";
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = authSlice;

export const {logout, authMe} = actions;
export default reducer;