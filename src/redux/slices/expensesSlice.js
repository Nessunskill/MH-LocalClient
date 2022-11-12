import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $axios from "../../axios/axios";

const initialState = {
    expenses: [],
    expensesLoadingStatus: "idle",
}

export const fetchExpenses = createAsyncThunk(
    "expenses/fetchExpenses",
    async () => {
        return $axios.get("categories");
    }
);

const expenses = createSlice({
    name: "expenses",
    initialState,
    reducers: {
        createExpense: (state, action) => { state.expenses.push(action.payload.data) },
        updateExpenseBalance: (state, action) => {
            state.expenses.forEach(item => {
                if (item.id === action.payload.id) {
                    item.amount = item.amount + action.payload.amount;
                }
            });
        },
        updateExpenseInfo: (state, action) => {
            state.expenses.forEach(item => {
                if (item.id === action.payload.id) {
                    item.title = action.payload.title;
                    item.thumbnail = action.payload.icon;
                    item.currency = action.payload.currency;

                }
            });
        },
        updateExpenseAmount: (state, action) => {
            state.expenses.forEach(item => {
                if (item.id === action.payload.id) {
                    item.amount = item.amount - action.payload.oldTransactionAmount + action.payload.newTransactionAmount;
                }
            });
        },
        removeExpense: (state, action) => {
            state.expenses = state.expenses.filter(item => item.id !== action.payload.id);
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchExpenses.pending, state => {
                state.expensesLoadingStatus = "loading";
            })
            .addCase(fetchExpenses.fulfilled, (state, action) => {
                state.expenses = action.payload.data.data;
                state.expensesLoadingStatus = "idle";
            })
            .addCase(fetchExpenses.rejected, state => {
                state.expensesLoadingStatus = "error";
            })
            .addDefaultCase(() => {});
    }
});

const {actions, reducer} = expenses;

export const {createExpense, updateExpenseBalance, updateExpenseInfo, updateExpenseAmount, removeExpense} = actions;
export default reducer;