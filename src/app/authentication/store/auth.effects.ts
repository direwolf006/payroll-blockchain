import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType} from "@ngrx/effects";
import * as AuthActions from "../store/auth.actions";
import { catchError, concatMap, exhaustMap, map, tap } from 'rxjs/operators';
import { AuthService } from "../auth.service";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { AuthData, AuthResponse, UserAuthModel } from "src/app/models/auth.model";

@Injectable()
export class AuthEffects {
    constructor(private actions$ : Actions,private authService : AuthService,private router : Router){}
    test : AuthResponse;
    initiatelogin$ = createEffect(()=>this.actions$.pipe(
        ofType(AuthActions.initiatelogin),
        concatMap((payload)=>{
            
            if(payload.userType==="Employee"){
                return this.authService.loginEmployee(payload).pipe(
                    tap(authResponse => { 
                        if(authResponse.code===0){                 
                        this.authService.setLogoutTimer(+authResponse.authData.expiresIn * 1000);
                        }
                    }),
                    map(authResponse => {
                        
                        if(authResponse.code===0){
                            
                            const expirationDate = new Date(new Date().getTime()+ +authResponse.authData.expiresIn*1000)                            
                            const authData = new UserAuthModel(
                                authResponse.authData.employee_id,
                                'Employee',
                                authResponse.authData.token,
                                expirationDate.getTime().toString()
                            )
                            localStorage.setItem('authData',JSON.stringify(authData))
                            
                            return AuthActions.loginSuccess({
                                    authData:authData,
                                    userType:'Employee',
                                    authStatus:true,
                                    authError : null
                                })
                        }else{                            
                            return AuthActions.loginFail({
                                errorMessage : authResponse.code
                            })
                        }
                    }),
                    catchError(error => of(AuthActions.loginSuccess({
                        authData : null,
                        userType : null,
                        authStatus : false,
                        authError : null
                    })))
                )
            }else{
                return this.authService.loginEmployer(payload).pipe(
                    // tap(resData => {
                    //     if(resData.code===0){                 
                    //         this.authService.setLogoutTimer(+resData.authData.expiresIn * 1000);
                    //     }
                    // }),
                    map(authResponse => {
                        if(authResponse.code===0){
                            const expirationDate = new Date().getTime()+ +authResponse.authData.expiresIn*1000
                            const authData = new UserAuthModel(
                                authResponse.authData.employee_id,
                                'Employer',
                                authResponse.authData.token,
                                expirationDate.toString()
                            )
                            
                            localStorage.setItem('authData',JSON.stringify(authData))

                            
                            return AuthActions.loginSuccess({
                                authData:authData,
                                userType:'Employer',
                                authStatus:true,
                                authError : null
                            })
                        }else{                            
                            return AuthActions.loginFail({
                                errorMessage : authResponse.code
                            })
                        }
                        
                    }),
                    catchError(error => of(AuthActions.loginSuccess({
                        authData : null,
                        userType : null,
                        authStatus : false,
                        authError : null
                    })))
                )
            }
            
        })
    ))

    authRedirect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginSuccess),
            tap((payload) => { 
                if(payload.userType==="Employee"){
                    this.router.navigate(['/dashboard/employee'])
                }else{
                    this.router.navigate(['/dashboard/employer'])
                } 
            })
        ), { dispatch: false }
    );


  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
    ofType(AuthActions.autoLogin),
      map(() => {
        const authData: UserAuthModel = JSON.parse(localStorage.getItem('authData'));
        
        if (!authData) {

          return { type: 'DUMMY' };
        }

        const loadedUser = new UserAuthModel(
            authData.id,
            authData.userType,
            authData._token,
            authData._tokenExpirationDate
        );

        if (loadedUser.token) {
          // this.user.next(loadedUser);
          
          const expirationDuration =new Date(+authData._tokenExpirationDate).getTime()-new Date().getTime();          
          this.authService.setLogoutTimer(expirationDuration);
            return AuthActions.loginSuccess({
                authData:loadedUser,
                userType:authData.userType,
                authStatus:true,
                authError : null
            })
          // const expirationDuration =
          //   new Date(userData._tokenExpirationDate).getTime() -
          //   new Date().getTime();
          // this.autoLogout(expirationDuration);
        }
        return { type: 'DUMMY' };
      })
    )
  );


  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {          
        this.authService.clearLogoutTimer();
        localStorage.removeItem('authData');
        this.router.navigate(['/auth']);
      })
    ),
    { dispatch: false }
  );

}