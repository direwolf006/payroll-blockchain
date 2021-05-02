import { createAction, props} from "@ngrx/store";
import { EmployeeData } from "src/app/models/employee.model";
import { TransactionData } from "src/app/models/history.model";

export const fetchTransactionData = createAction(
    '[Auth] Fetch Transaction Data',
    props<{employee_id : string,token: string}>()
);

export const setTransactionData = createAction(
    '[Auth] Set Transaction Data',
    props<{transactionData :TransactionData[]}>()
);


export const fetchTransactionDataFail = createAction(
    '[Auth] Fetch Transaction Data Fail'
);

// export const clearEmployeeData = createAction('[Auth] Clear Employee Data')