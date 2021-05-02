
export interface LoginData {
    emailID: string, 
    password : string,
    userType : string
}

export interface AuthResponse{
    authData : {
        employee_id? : string ,
        employer_id? : string , 
        token : string
        expiresIn : string
    }        
    code : number,
    message : string,
}

export interface AuthData{
    authData : UserAuthModel,
    userType : string,
    authStatus : boolean,
    authError : number
}

export class UserAuthModel {
    constructor(
      public id: string,
      public userType : string,
      public _token: string,
      public _tokenExpirationDate: string
    ) {}
  
    get token() {
      if (!this._tokenExpirationDate || new Date() > new Date(this._tokenExpirationDate)) {
        return null;
      }
      return this._token;
    }
  }