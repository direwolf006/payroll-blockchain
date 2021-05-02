export interface SalaryData {
    date : string,
    base : string,
    allowance : string,
    specialAllowance : string,
    gross : string,
    total : string,
    bonus: string,
    monthYear : string
}

export interface SalaryDataResponse {
    code : number,
    salaryData : SalaryData[]
}

export interface TransactionData {
    amount :  string,
    date : string,
    time : string,
    monthYear :  string,
    transactionId :  string,
    methodOfTransfer :  string,
    bankName :  string,
    accountNumber :  string,
    IFSCCode :  string,
    branch :  string,
}

export interface TransactionDataResponse {
    code : number,
    transactionData : TransactionData[]
}