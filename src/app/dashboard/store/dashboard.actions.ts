import { createAction, props} from "@ngrx/store";
import { EmployeeAboutData, EmployeeData, RegisterData, updateEmployeeAboutResponse } from "src/app/models/employee.model";
import { EmployeesData } from "src/app/models/employer.model";
import { TransactionData } from "src/app/models/history.model";
import { EmployeesPaymentData } from "src/app/models/payment.model";

export const fetchEmployeeData = createAction(
    '[Dashboard] Fetch Employee Data',
    props<{employee_id : string,token : string }>()
);

export const setEmployeeData = createAction(
    '[Dashboard] Set Employee Data',
    props<EmployeeData>()
);

export const fetchEmployeeDataFail = createAction(
    '[Dashboard] Fetch Employee Data Fail'
);

export const fetchEmployeesPaymentData = createAction(
    '[Dashboard] Fetch Employees Payment Data',
    props<{token:string}>()
);

export const setEmployeesPaymentData = createAction(
    '[Dashboard] Set Employees Payment Data',
    props<{employeesPaymentData : EmployeesPaymentData[]}>()
);

export const fetchEmployeesPaymentDataFail = createAction(
    '[Dashboard] Fetch Employees Payment Data Fail',
);

export const fetchEmployeesData = createAction(
    '[Dashboard] Fetch Employees Data',
    props<{token:string}>()
);

export const setEmployeesData = createAction(
    '[Dashboard] Set Employees Data',
    props<{employeesData : EmployeesData[]}>()
);

export const fetchEmployeesDataFail = createAction(
    '[Dashboard] Fetch Employees Data Fail',
);

export const updateEmployeeAboutData = createAction(
    '[Dashboard] Update Employees About Data',
    props<{employeeAboutData :EmployeeAboutData,token: string}>()

);

export const addEmployee = createAction(
    '[Dashboard] Add Employee',
    props<{employeeData :RegisterData,token: string}>()

);

export const addEmployeeSuccess = createAction(
    '[Dashboard] Add Employee Success'
);

export const clearEmployeeSuccess = createAction(
    '[Dashboard] Clear Employee Success'
);

export const payEmployee = createAction(
    '[Dashboard] Pay Employee',
    props<{paymentData:EmployeesPaymentData,token: string}>()
);

export const payEmployeeSuccess = createAction(
    '[Dashboard] Pay Employee Success'
);

export const clearPayEmployeeSuccess = createAction(
    '[Dashboard] Clear Pay Employee Success'
);

export const updateEmployeeSalary = createAction(
    '[Dashboard] Update Employee Salary',
    props<{updatedData:any,token: string}>()
);

export const updateEmployeeSalarySuccess = createAction(
    '[Dashboard] Update Employee Salary Success'
);

export const clearUpdateEmployeeSalarySucess = createAction(
    '[Dashboard] Clear Update Employee Salary Success'
);

export const fetchTransactionsData = createAction(
    '[Dashboard] Fetch Transactions Data',
    props<{token:string}>()
);

export const fetchTransactionsDataSuccess = createAction(
    '[Dashboard] Fetch Transactions Data Success',
    props<{transactions:TransactionData[]}>()
);

// export const clearEmployeeData = createAction('[Dashboard] Clear Employee Data')