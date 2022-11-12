import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { isExpired } from "react-jwt";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialState = {
    auth: false,
    userName: "",
    authLoadingStatus: "idle",
}

export const login = createAsyncThunk(
    "auth/login",
    (userData) => {
        const request = axios.post("http://localhost:4000/api/login", userData, {withCredentials: true});
        return request;
    }
);

export const checkAuth = createAsyncThunk(
    "auth/checkAuth",
    (accessToken) => {
        const isTokenExpired = isExpired(accessToken);
        const navigate = useNavigate();
        if (!isTokenExpired) return

        return axios.get("http://localhost:4000/api/refresh", {withCredentials: true})
            .then(res => res.data)
            .then(res => localStorage.setItem("accessToken", res.accessToken))
            .catch(() => navigate("/login"));
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: state => {
            state.auth = false;
            state.userName = "";
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
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.auth = true;
            })
            .addCase(checkAuth.rejected, state => {
                state.auth = false;
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = authSlice;

export const {logout} = actions;
export default reducer;