import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from "./store/auth.actions";
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { AuthResponse, LoginData } from "../models/auth.model";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.reducer";

@Injectable({providedIn:"root"})
export class AuthService {

    private tokenExpirationTimer: any;
    constructor(public http : HttpClient,private store : Store<AppState>){}
 
    loginEmployee(loginData : LoginData) : Observable<AuthResponse>{
        return this.http.post<AuthResponse>(
            `http://localhost:3005/login`,
            loginData,
            {
                headers: new HttpHeaders({
                  'Content-Type':  'application/json',
                  Authorization: 'my-auth-token'
                })
            }
        ).pipe(map((response )=>{
            return response
        }));
    }

    loginEmployer(loginData : LoginData) : Observable<AuthResponse>{
        return this.http.post<AuthResponse>(
            `http://localhost:3005/login`,
            loginData,
            {
                headers: new HttpHeaders({
                  'Content-Type':  'application/json',
                  Authorization: 'my-auth-token'
                })
            }
        ).pipe(map((response )=>{          
            return response
        }));
    }

    setLogoutTimer(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {            
          this.store.dispatch(AuthActions.logout());
        }, expirationDuration);
      }
    
      clearLogoutTimer() {
        if (this.tokenExpirationTimer) {
          clearTimeout(this.tokenExpirationTimer);
          this.tokenExpirationTimer = null;
        }
      }

}
