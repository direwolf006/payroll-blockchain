import { state } from "@angular/animations";
import { Action, createReducer, on, State } from "@ngrx/store";
import { AuthData, AuthResponse } from "src/app/models/auth.model";
import { initiatelogin, loginFail, loginSuccess, logout } from "./auth.actions";



export const intialState : AuthData = {
    authData : null,
    userType : null,
    authStatus : false,
    authError : null
}

const _authReducer = createReducer(
    intialState,
    on(loginSuccess,(state,payload)=>({
        ...state,
        authStatus: true,
        userType : payload.userType,
        authData : payload.authData,
        authError : null
    })),
    on(logout,(state)=>({
        ...state,
        ...intialState
   })),
   on(loginFail,(state,payload)=>({
       ...state,
       authError : payload.errorMessage  
   }))
)

export function authReducer(state=intialState, action: Action) {
    return _authReducer(state, action);
  }
  