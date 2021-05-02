
export interface EmployeesPaymentData{
    datetime : string,
    employee_id : string,
    name : string,
    bankName : string,
    accountNumber : string,
    IFSCCode : string,
    branchName : string,
    base : string , 
    allowance : string,
    specialAllowance : string,
    bonus ? : string
}


export interface EmployeesPaymentDataResponse {
    code : number ,
    employeesPaymentData : EmployeesPaymentData[]
}