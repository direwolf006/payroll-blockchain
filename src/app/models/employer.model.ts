
export class EmployerAuthModel {
  constructor(
    public id: string,
    private userType : string,
    private _token: string,
    private _tokenExpirationDate: string
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > new Date(this._tokenExpirationDate)) {
      return null;
    }
    return this._token;
  }
}

export interface EmployeesData{
  employee_id : string,
  name : string,
  designation : string , 
  department : string  
}
  
export interface FetchEmployeesDataResponse{
  code : number ,
  employeesData : EmployeesData[]
}
  
