import { ActionReducerMap } from "@ngrx/store";
import { authReducer } from "../authentication/store/auth.reducer";
import { dashboardReducer, DashboardState } from "../dashboard/store/dashboard.reducer";

import { AuthData } from "../models/auth.model";
import { SalaryData, TransactionData } from "../models/history.model";
import { SalaryHistoryState, salaryReducer } from "../salary/store/salary.reducer";
import { TransactionHistoryState, transactionReducer } from "../transaction/store/transaction.reducer";


export interface AppState {
    auth : AuthData,
    dashboard : DashboardState,
    salary : SalaryHistoryState,
    transaction : TransactionHistoryState
}

export const appReducer : ActionReducerMap<AppState> = {
    auth : authReducer,
    dashboard : dashboardReducer,
    salary : salaryReducer,
    transaction : transactionReducer
}