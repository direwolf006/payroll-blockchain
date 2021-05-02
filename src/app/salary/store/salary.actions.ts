import { createAction, props} from "@ngrx/store";
import { EmployeeData } from "src/app/models/employee.model";
import { SalaryData } from "src/app/models/history.model";

export const fetchSalaryData = createAction(
    '[Auth] Fetch Salary Data',
    props<{employee_id : string,token: string}>()
);

export const setSalaryData = createAction(
    '[Auth] Set Salary Data',
    props<{salaryData :SalaryData[]}>()
);


export const fetchSalaryDataFail = createAction(
    '[Auth] Fetch Salary Data Fail'
);

// export const clearEmployeeData = createAction('[Auth] Clear Employee Data')