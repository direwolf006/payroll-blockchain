import { state } from "@angular/animations";
import { Action, createReducer, on } from "@ngrx/store";
import { AuthData, AuthResponse } from "src/app/models/auth.model";
import { EmployeeData } from "src/app/models/employee.model";
import { EmployeesData } from "src/app/models/employer.model";
import { TransactionData } from "src/app/models/history.model";
import { EmployeesPaymentData } from "src/app/models/payment.model";
import { addEmployeeSuccess, clearEmployeeSuccess, clearPayEmployeeSuccess, clearUpdateEmployeeSalarySucess, fetchEmployeeData, fetchTransactionsDataSuccess, payEmployeeSuccess, setEmployeeData, setEmployeesData, setEmployeesPaymentData, updateEmployeeSalarySuccess } from "./dashboard.actions";

export interface DashboardState {
    employeeData : EmployeeData,
    employeesPaymentData : EmployeesPaymentData[],
    employeesTransactionsData : TransactionData[],
    employeesData : EmployeesData[],
    addEmployeeStatus : boolean,
    payEmployeeStatus : boolean,
    updateEmployeeStatus : boolean
}

export const intialState : DashboardState ={
    employeesPaymentData :  null,
    employeesTransactionsData : null,
    employeeData : {
        about:{
            id : null,
            name: null,
            department: null,
            designation: null
        },             
        salary : {
            base : null, 
            allowance : null,
            specialAllowance : null,
            gross : null
        },
        leaveStats : {
            present : null ,
            leave : null
        },
        arrivalTimings : {
            onTime : null ,
            late : null
        },
        bankDetails : {
            bankName : null,
            branch : null,
            accountNumber : null,
            IFSCCode : null
        }
    },
    employeesData : [],
    addEmployeeStatus : null,
    payEmployeeStatus : null,
    updateEmployeeStatus : null
}

const _dashboardReducer = createReducer(
    intialState,
    on(setEmployeeData,(state,payload)=>({
        ...state,
        employeeData : payload
    })),
    on(setEmployeesPaymentData,(state,payload)=>({
        ...state,
        employeesPaymentData : payload.employeesPaymentData
    })),
    on(setEmployeesData,(state,payload)=>({
        ...state,
        employeesData : payload.employeesData
    })),
    on(addEmployeeSuccess,(state)=>({
        ...state,
        addEmployeeStatus : true
    })),
    on(clearEmployeeSuccess,(state)=>({
        ...state,
        addEmployeeStatus : null
    })),
    on(payEmployeeSuccess,(state)=>({
        ...state,
        payEmployeeStatus : true
    })),
    on(clearPayEmployeeSuccess,(state)=>({
        ...state,
        payEmployeeStatus : null
    })),
    on(updateEmployeeSalarySuccess,(state)=>({
        ...state,
        updateEmployeeStatus : true
    })),
    on(clearUpdateEmployeeSalarySucess,(state)=>({
        ...state,
        updateEmployeeStatus : null
    })),
    on(fetchTransactionsDataSuccess,(state,payload)=>({
        ...state,
        employeesTransactionsData : payload.transactions
    }))
)

export function dashboardReducer(state=intialState, action: Action) {
    return _dashboardReducer(state, action);
  }
  