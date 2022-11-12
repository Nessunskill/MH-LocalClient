import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $axios from "../../axios/axios";

const initialState = {
    income: [],
    incomeLoadingStatus: "idle",
}

export const fetchIncome = createAsyncThunk(
    "income/fetchIncome",
    async () => {
        return $axios.get("income");
    }
);

const income = createSlice({
    name: "income",
    initialState,
    reducers: {
        createIncome: (state, action) => { state.income.push(action.payload) },
        updateIncomeBalance: (state, action) => {
            state.income.forEach(item => {
                if (item.id === action.payload.id) {
                    item.amount = item.amount + action.payload.amount;
                }
            });
        },
        updateIncomeInfo: (state, action) => {
            state.income.forEach(item => {
                if (item.id === action.payload.id) {
                    item.title = action.payload.title;
                    item.thumbnail = action.payload.icon;
                    item.currency = action.payload.currency;

                }
            });
        },
        updateIncomeAmount: (state, action) => {
            state.income.forEach(item => {
                if (item.id === action.payload.id) {
                    item.amount = item.amount - action.payload.oldTransactionAmount + action.payload.newTransactionAmount;
                }
            });
        },
        removeIncome: (state, action) => {
            state.income = state.income.filter(item => item.id !== action.payload.id);
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchIncome.pending, state => {
                state.incomeLoadingStatus = "loading";
            })
            .addCase(fetchIncome.fulfilled, (state, action) => {
                state.incomeLoadingStatus = "idle";
                state.income = action.payload.data.data;
            })
            .addCase(fetchIncome.rejected, state => {
                state.incomeLoadingStatus = "error";
            })
            .addDefaultCase(() => {});
    }
});

const {actions, reducer} = income;

export const {createIncome, updateIncomeBalance, updateIncomeInfo, updateIncomeAmount, removeIncome} = actions;
export default reducer;