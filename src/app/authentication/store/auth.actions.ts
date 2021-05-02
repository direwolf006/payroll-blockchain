import { createAction, props } from "@ngrx/store";
import { AuthData, LoginData } from "src/app/models/auth.model";



export const initiatelogin = createAction(
    '[Auth] Initiate Login',
    props<LoginData>()
);

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<AuthData>()
)
    
export const logout = createAction('[Auth] Logout');

export const loginFail = createAction(
    '[Auth] Login Fail',
    props<{
      errorMessage: number
    }>()
  );
  
  
  export const clearError = createAction(
    '[Auth] Clear Error'
  );

export const autoLogin = createAction(
    '[Auth] Auto login', 
)
