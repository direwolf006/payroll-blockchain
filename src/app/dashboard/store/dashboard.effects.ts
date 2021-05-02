import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType} from "@ngrx/effects";
import * as DashboardActions from "./dashboard.actions";
import { catchError, concatMap, exhaustMap, map, tap } from 'rxjs/operators';
import { of } from "rxjs";
import { Router } from "@angular/router";
import { AuthData, AuthResponse } from "src/app/models/auth.model";
import { DashboardService } from "../dashboard.service";

@Injectable()
export class DashboardEffects {
    constructor(private actions$ : Actions,private dashboardService : DashboardService,private router : Router){}
    fetchEmployeeData$ = createEffect(()=>this.actions$.pipe(
        ofType(DashboardActions.fetchEmployeeData),
        concatMap((payload)=>{
            
                return this.dashboardService.fetchEmployeeData(payload).pipe(
                    map(response => {
                        if(response.code===0){
                            
                            return DashboardActions.setEmployeeData(response.employeeData)
                        }else{
                            return DashboardActions.fetchEmployeeDataFail()
                        }
                    })
                )
        })
    ))

    fetchEmployeesPaymentData$ = createEffect(()=>this.actions$.pipe(
        ofType(DashboardActions.fetchEmployeesPaymentData),
        concatMap((payload)=>{
            
                return this.dashboardService.fetchEmployeesPaymentData(payload.token).pipe(
                    map(response => {
                        if(response.code===0){
                            return DashboardActions.setEmployeesPaymentData({employeesPaymentData : response.employeesPaymentData})
                        }else{
                            return DashboardActions.fetchEmployeeDataFail()
                        }
                    })
                )
        })
    ))
    
    fetchEmployeesData$ = createEffect(()=>this.actions$.pipe(
        ofType(DashboardActions.fetchEmployeesData),
        concatMap((payload)=>{            
                return this.dashboardService.fetchAllEmployees(payload.token).pipe(
                    map(response => {
                        if(response.code===0){
                            return DashboardActions.setEmployeesData({employeesData : response.employeesData})
                        }else{
                            return DashboardActions.fetchEmployeesDataFail()
                        }
                    })
                )
        })
    ))

    updateEmployeeAboutData$ = createEffect(()=>this.actions$.pipe(
        ofType(DashboardActions.updateEmployeeAboutData),
        concatMap((payload)=>{
            
                return this.dashboardService.updateEmployeeAboutData(payload).pipe(
                    map(response => {
                        if(response.code===0){
                            return DashboardActions.fetchEmployeeData({ employee_id : payload.employeeAboutData.id,token:payload.token})
                        }else{
                            return DashboardActions.fetchEmployeeDataFail()
                        }
                    })
                )
        })
    ))

    addEmployee$ = createEffect(()=>this.actions$.pipe(
        ofType(DashboardActions.addEmployee),
        concatMap((payload)=>{
            
                return this.dashboardService.addEmployee(payload.token,payload.employeeData).pipe(
                    map(response => {
                        if(response.code===0){
                            return DashboardActions.addEmployeeSuccess()
                        }else{
                            return DashboardActions.fetchEmployeeDataFail()
                        }
                    })
                )
        })
    ))

    payEmployee$ = createEffect(()=>this.actions$.pipe(
        ofType(DashboardActions.payEmployee),
        concatMap((payload)=>{
            
                return this.dashboardService.payEmployee(payload.token,payload.paymentData).pipe(
                    map(response => {
                        if(response.code===0){
                            return DashboardActions.payEmployeeSuccess()
                        }else{
                            return DashboardActions.fetchEmployeeDataFail()
                        }
                    })
                )
        })
    ))

    updateEmployeeSalary$ = createEffect(()=>this.actions$.pipe(
        ofType(DashboardActions.updateEmployeeSalary),
        concatMap((payload)=>{
            
                return this.dashboardService.updateEmployeeSalary(payload.token,payload.updatedData).pipe(
                    map(response => {
                        if(response.code===0){
                            
                            return DashboardActions.updateEmployeeSalarySuccess()
                        }else{
                            return DashboardActions.fetchEmployeeDataFail()
                        }
                    })
                )
        })
    ))

    getAllTransactions$ = createEffect(()=>this.actions$.pipe(
        ofType(DashboardActions.fetchTransactionsData),
        concatMap((payload)=>{
                return this.dashboardService.fetchAllTransactions(payload.token).pipe(
                    map(response => {
                        if(response.code===0){
                            return DashboardActions.fetchTransactionsDataSuccess({transactions : response.transactionData})
                        }else{
                            return DashboardActions.fetchEmployeeDataFail()
                        }
                    })
                )
        })
    ))

    authRedirect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardActions.fetchEmployeeDataFail),
            tap((payload) => { 
                    this.router.navigate(['/dashboard/employee'])
            })
        ), { dispatch: false }
    );


//   autoFetchEmployeeData$ = createEffect(() =>
//     this.actions$.pipe(
//     ofType(AuthActions.autoLogin),
//       map(() => {
//         const authData: EmployeeAuthModel = JSON.parse(localStorage.getItem('authData'));
//         if (!authData) {
//           return { type: 'DUMMY' };
//         }

//         const loadedUser = new EmployeeAuthModel(
//             authData.id,
//             authData.userType,
//             authData._token,
//             authData._tokenExpirationDate
//         );

//         if (loadedUser.token) {
//           // this.user.next(loadedUser);
          
//           const expirationDuration =new Date(+authData._tokenExpirationDate).getTime()-new Date().getTime();          
//           this.authService.setLogoutTimer(expirationDuration);
//             return AuthActions.loginSuccess({
//                 authData:loadedUser,
//                 userType:'Employee',
//                 authStatus:true,
//                 authError : null
//             })
//           // const expirationDuration =
//           //   new Date(userData._tokenExpirationDate).getTime() -
//           //   new Date().getTime();
//           // this.autoLogout(expirationDuration);
//         }
//         return { type: 'DUMMY' };
//       })
//     )
//   );


//   logout$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.logout),
//       tap(() => {          
//         this.authService.clearLogoutTimer();
//         localStorage.removeItem('authData');
//         this.router.navigate(['/auth']);
//       })
//     ),
//     { dispatch: false }
//   );

}