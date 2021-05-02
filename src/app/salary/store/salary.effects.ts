import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType} from "@ngrx/effects";
import * as HistoryActions from "./salary.actions";
import { catchError, concatMap, exhaustMap, map, tap } from 'rxjs/operators';
import { of } from "rxjs";
import { Router } from "@angular/router";
import { AuthData, AuthResponse } from "src/app/models/auth.model";
import { SalaryService } from "../salary.service";

@Injectable()
export class SalaryEffects {
    constructor(private actions$ : Actions,private salaryService : SalaryService,private router : Router){}

    fetchSalaryData$ = createEffect(()=>this.actions$.pipe(
        ofType(HistoryActions.fetchSalaryData),
        concatMap((payload)=>{
            return this.salaryService.fetchSalaryData(payload).pipe(
                map(response => {
                    if(response.code===0){
                        return HistoryActions.setSalaryData({salaryData : response.salaryData})
                    }else{
                        return HistoryActions.fetchSalaryDataFail()
                    }
                })
            )
        })
    ))



    authRedirect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HistoryActions.fetchSalaryDataFail),
            tap((payload) => { 
                    this.router.navigate(['/dashboard/employee'])
            })
        ), { dispatch: false }
    );


}