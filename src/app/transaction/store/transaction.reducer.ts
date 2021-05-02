import { state } from "@angular/animations";
import { Action, createReducer, on, State } from "@ngrx/store";
import { EmployeeData } from "src/app/models/employee.model";
import { TransactionData } from "src/app/models/history.model";
import { setTransactionData } from "./transaction.actions";

export interface TransactionHistoryState {
    transactionData : TransactionData[]
}

export const intialState : TransactionHistoryState={
    transactionData : null
}

const _transactionReducer = createReducer(
    intialState,
    on(setTransactionData,(state,payload)=>({
        ...state,
        transactionData : payload.transactionData
    }))
)

export function transactionReducer(state=intialState, action: Action) {
    return _transactionReducer(state, action);
  }
  