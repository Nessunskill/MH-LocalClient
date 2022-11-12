import { configureStore } from "@reduxjs/toolkit";

import auth from "../slices/authSlice";
import icons from "../slices/iconsSlice";
import income from "../slices/incomeSlice";
import wallets from "../slices/walletsSlice";
import expenses from "../slices/expensesSlice";
import transactions from "../slices/transactionsSlice";

const store = configureStore({
    reducer: {auth, icons, income, wallets, expenses, transactions},
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [
                "auth/login/fulfilled", 
                "icons/fetchIcons/fulfilled", 
                "income/fetchIncome/fulfilled", 
                "wallets/fetchWallets/fulfilled", 
                "expenses/fetchExpenses/fulfilled", 
                "transactions/fetchTransactions/fulfilled"
            ]
          },
    }),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;