import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import axios from "axios";

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
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = authSlice;

export const {logout} = actions;
export default reducer;

/*
Перед каждым запросом будет вызывать метод checkAuth

Метод checkAuth проверяет авторизован ли пользователь или нет.
    В первую очередь проверяем не протух ли accessToken
    Если не протух, то пропускаем запрос дальше.
    !Если протух, то достаем из куков refreshToken, проверяем его на срок годности
    -> Если срок годности истек переводим пользователя на /login
    -> Если срок годности не истек, то делаем запрос на /refresh, получаем новую пару токенов, access записываем в localStorage, а 
        refresh уже сервер нам записал в куки
    -> Пропускаем запрос дальше

*/