import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.reducer";
import { EmployeeAboutData, EmployeeData, fetchEmployeeDataResponse, updateEmployeeAboutResponse } from "../models/employee.model";
import { EmployeesPaymentData, EmployeesPaymentDataResponse } from "../models/payment.model";
import { FetchEmployeesDataResponse } from "../models/employer.model";
import { TransactionDataResponse } from "../models/history.model";

@Injectable({providedIn:"root"})
export class DashboardService {

    bonus = new BehaviorSubject("")
    constructor(private http : HttpClient,private store : Store<AppState>){}

    setBonus(updatedBonus){
        this.bonus.next(updatedBonus)
    }
 
    fetchEmployeeData(fetchData : {employee_id:string,token: string}) : Observable<fetchEmployeeDataResponse>{
        return this.http.get<fetchEmployeeDataResponse>(
            `http://localhost:3005/employee`,
            {
                headers: new HttpHeaders({
                  'Content-Type':  'application/json',
                  'x-access-token': fetchData.token
                }),
                params : new HttpParams()
                .set('id',fetchData.employee_id)
            }
        ).pipe(map((response )=>{
            console.log(response);
            
            return response
        }));
    }

    fetchEmployeesPaymentData(token : string) : Observable<EmployeesPaymentDataResponse>{
        return this.http.get<EmployeesPaymentDataResponse>(
            `http://localhost:3005/employees/payment`,
            {
                headers: new HttpHeaders({
                  'Content-Type':  'application/json',
                  'x-access-token': token
                })
            }
        ).pipe(map((response )=>{
            console.log(response);            
            return response
        }));
    }

    updateEmployeeAboutData(updatedData : {employeeAboutData : EmployeeAboutData, token : string}) : Observable<updateEmployeeAboutResponse>{
        return this.http.post<updateEmployeeAboutResponse>(
            `http://localhost:3005/employee/update/about`,
            updatedData.employeeAboutData,
            {
                headers: new HttpHeaders({
                  'Content-Type':  'application/json',
                  'x-access-token': updatedData.token
                })
            }
        ).pipe(map((response )=>{
            console.log(response);            
            return response
        }));
    }

    fetchAllEmployees(token : string) : Observable<FetchEmployeesDataResponse>{
        return this.http.get<FetchEmployeesDataResponse>(
            `http://localhost:3005/employees`,
            {
                headers: new HttpHeaders({
                  'Content-Type':  'application/json',
                  'x-access-token': token
                })
            }
        ).pipe(map((response )=>{
            console.log(response);            
            return response
        }));
    }

    fetchAllTransactions(token : string) : Observable<TransactionDataResponse>{
        return this.http.get<TransactionDataResponse>(
            `http://localhost:3005/employer/transactions`,
            {
                headers: new HttpHeaders({
                  'Content-Type':  'application/json',
                  'x-access-token': token
                })
            }
        ).pipe(map((response )=>{
            console.log(response);            
            return response
        }));
    }

    addEmployee(token : string,registerData) : Observable<FetchEmployeesDataResponse>{
        return this.http.post<FetchEmployeesDataResponse>(
            `http://localhost:3005/employee/register`,
            registerData,
            {
                headers: new HttpHeaders({
                  'Content-Type':  'application/json',
                  'x-access-token': token
                })
            }
        ).pipe(map((response )=>{
            console.log(response);            
            return response
        }));
    }

    payEmployee(token : string,payementData : EmployeesPaymentData) : Observable<FetchEmployeesDataResponse>{
        return this.http.post<FetchEmployeesDataResponse>(
            `http://localhost:3005/employee/transaction/add`,
            payementData,
            {
                headers: new HttpHeaders({
                  'Content-Type':  'application/json',
                  'x-access-token': token
                })
            }
        ).pipe(map((response )=>{
            console.log(response);            
            return response
        }));
    }

    updateEmployeeSalary(token : string,updatedData ) : Observable<FetchEmployeesDataResponse>{
        return this.http.post<FetchEmployeesDataResponse>(
            `http://localhost:3005/employee/update/salary`,
            updatedData,
            {
                headers: new HttpHeaders({
                  'Content-Type':  'application/json',
                  'x-access-token': token
                })
            }
        ).pipe(map((response )=>{
            console.log(response);            
            return response
        }));
    }
}
