// export class EmployeeAuthModel {
//   constructor(
//     public id: string,
//     public userType : string,
//     public _token: string,
//     public _tokenExpirationDate: string
//   ) {}

//   get token() {
//     if (!this._tokenExpirationDate || new Date() > new Date(this._tokenExpirationDate)) {
//       return null;
//     }
//     return this._token;
//   }
// }

export interface EmployeeAboutData {
  id : string,
  name: string,
  department: string,
  designation: string
}

export interface EmployeeSalaryData {
  base : string, 
  allowance : string,
  specialAllowance : string,
  gross : string
}

export interface EmployeeData{  
  about : EmployeeAboutData,
  salary : EmployeeSalaryData,
  leaveStats : {
    present : string ,
    leave : string
  },
  arrivalTimings : {
    onTime : string ,
    late : string
  },
  bankDetails : {
      bankName : string,
      branch : string,
      accountNumber : string,
      IFSCCode : string
  }
}

export interface RegisterData{
    IFSCCode: string,
    accountNumber: string,
    allowance: string,
    bankName:string,
    base:string,
    branch: string,
    department: string,
    designation: string,
    email: string,
    name:string,
    password: string,
    specialAllowance: string,
}
  
export interface fetchEmployeeDataResponse {
  code : number , 
  message : string , 
  employeeData : EmployeeData
}

export interface updateEmployeeAboutResponse {
  code : number , 
  message : string
}

