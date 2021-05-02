import { state } from "@angular/animations";
import { Action, createReducer, on, State } from "@ngrx/store";
import { EmployeeData } from "src/app/models/employee.model";
import { SalaryData } from "src/app/models/history.model";
import { setSalaryData } from "./salary.actions";

export interface SalaryHistoryState {
    salaryData : SalaryData[]
}

export const intialState : SalaryHistoryState={
    salaryData : null
}

const _salaryReducer = createReducer(
    intialState,
    on(setSalaryData,(state,payload)=>({
        ...state,
        salaryData : payload.salaryData
    }))
)

export function salaryReducer(state=intialState, action: Action) {
    return _salaryReducer(state, action);
  }
  