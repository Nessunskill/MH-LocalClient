import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import $axios from "../../axios/axios";

const initialState = {
    icons: [],
    iconsLoadingStatus: "idle",
}

export const fetchIcons = createAsyncThunk(
    "icons/fetchIcons",
    async () => {        
        return $axios.get("icons");
    }
);

const iconsSlice = createSlice({
    name: "icons",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(fetchIcons.pending, state => {
                state.iconsLoadingStatus = "loading";
            })
            .addCase(fetchIcons.fulfilled, (state, action) => {
                state.iconsLoadingStatus = "idle";
                state.icons = action.payload.data.data;
            })
            .addCase(fetchIcons.rejected, state => {
                state.iconsLoadingStatus = "error";
            })
            .addDefaultCase(() => {});
    }
});

const {reducer} = iconsSlice;

export default reducer;