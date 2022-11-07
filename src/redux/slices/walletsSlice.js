import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAuthorizedRequest } from "../../hooks/useAuthorizedRequest.hook";

const initialState = {
    wallets: [],
    walletsLoadingStatus: "idle",
}

export const fetchWallets = createAsyncThunk(
    "wallets/fetchWallets",
    async () => {
        const {request} = useAuthorizedRequest();

        return request("wallets");
    }
);

const wallets = createSlice({
    name: "wallets",
    initialState,
    reducers: {
        createWallet: (state, action) => { state.wallets.push(action.payload) },
        updateWalletBalance: (state, action) => {
            state.wallets.forEach(item => {
                if (item.id === action.payload.id) {
                    item.amount = item.amount + action.payload.amount;
                }
            });
        },
        updateWalletInfo: (state, action) => {
            state.wallets.forEach(item => {
                if (item.id === action.payload.id) {
                    item.title = action.payload.title;
                    item.thumbnail = action.payload.icon;
                    item.currency = action.payload.currency;

                }
            });
        },
        updateWalletAmount: (state, action) => {
            state.wallets.forEach(item => {
                if (item.id === action.payload.id) {
                    item.amount = item.amount + action.payload.oldTransactionAmount - action.payload.newTransactionAmount;
                }
            });
        },
        removeWallet: (state, action) => {
            state.wallets = state.wallets.filter(item => item.id !== action.payload.id);
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchWallets.pending, state => {
                state.walletsLoadingStatus = "loading";
            })
            .addCase(fetchWallets.fulfilled, (state, action) => {
                state.wallets = action.payload.data;
                state.walletsLoadingStatus = "idle";
            })
            .addCase(fetchWallets.rejected, state => {
                state.walletsLoadingStatus = "error";
            })
            .addDefaultCase(() => {});
    }
});

const {actions, reducer} = wallets;

export const {createWallet, updateWalletBalance, updateWalletInfo, updateWalletAmount, removeWallet} = actions;
export default reducer;