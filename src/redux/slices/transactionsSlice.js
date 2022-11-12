import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $axios from "../../axios/axios";

const initialState = {
    transactions: [],
    transactionsLoadingStatus: "idle",
}

export const fetchTransactions = createAsyncThunk(
    "transactions/fetchTransactions",
    async () => {
        return $axios.get("transactions");
    }
);

const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        createTransaction: (state, action) => { state.transactions.unshift(action.payload.data) },
        removeTransaction: (state, action) => {
            state.transactions = state.transactions.filter(item => item.id !== action.payload);
        },
        changeTransactionAmount: (state, action) => {
            state.transactions.forEach(item => {
                if (item.id === action.payload.id) {
                    item.amount = action.payload.amount;
                }
            });
        },
        changeTransactionDate: (state, action) => {
            state.transactions.forEach(item => {
                if (item.id === action.payload.id) {
                    item.date = action.payload.date;
                }
            })
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTransactions.pending, state => {
                state.transactionsLoadingStatus = "loading";
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.transactions = action.payload.data.data;
                state.transactions = state.transactions.reverse();
                state.transactionsLoadingStatus = "idle";
            })
            .addCase(fetchTransactions.rejected, state => {
                state.transactionsLoadingStatus = "error";
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = transactionsSlice;

export const {createTransaction, removeTransaction, changeTransactionAmount, changeTransactionDate} = actions;
export default reducer;