import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.reducer";
import { EmployeeData, fetchEmployeeDataResponse } from "../models/employee.model";
import { TransactionData, TransactionDataResponse } from "../models/history.model";

@Injectable({providedIn:"root"})
export class TransactionService {

    constructor(private http : HttpClient,private store : Store<AppState>){}
 
    fetchTransactionData(fetchData : {employee_id:string,token: string}) : Observable<TransactionDataResponse>{
        return this.http.get<TransactionDataResponse>(
            `http://localhost:3005/employee/transaction`,
            {
                headers: new HttpHeaders({
                  'Content-Type':  'application/json',
                  'x-access-token': fetchData.token
                }),
                params : new HttpParams()
                .set('id',fetchData.employee_id)
            }
        ).pipe(map((response )=>{
            console.log('The transactions received');
            console.log(response);
            
            return response
        }));
    }

}