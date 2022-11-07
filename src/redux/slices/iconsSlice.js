import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { useAuthorizedRequest } from "../../hooks/useAuthorizedRequest.hook";

const initialState = {
    icons: [],
    iconsLoadingStatus: "idle",
}

export const fetchIcons = createAsyncThunk(
    "icons/fetchIcons",
    async () => {
        const {request} = useAuthorizedRequest();
        
        return request("icons");
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
                state.icons = action.payload.data;
            })
            .addCase(fetchIcons.rejected, state => {
                state.iconsLoadingStatus = "error";
            })
            .addDefaultCase(() => {});
    }
});

const {reducer} = iconsSlice;

export default reducer;