import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { useAuthorizedRequest } from "../../hooks/useAuthorizedRequest.hook";

const initialState = {
    auth: false,
    userName: "",
    authLoadingStatus: "idle",
    accessToken: "",
}

export const login = createAsyncThunk(
    "auth/login",
    async (userData) => {
        const {request} = useAuthorizedRequest();

        return request("login", "POST", JSON.stringify(userData));
    }
);

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
                state.userName = action.payload.data.username;
                state.auth = true;
                state.accessToken = action.payload.data.accessToken;
                localStorage.setItem("accessToken", action.payload.data.accessToken);
                state.authLoadingStatus = "idle";
            })
            .addCase(login.rejected, state => {
                state.authLoadingStatus = "error";
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = authSlice;

export const {logout} = actions;
export default reducer;