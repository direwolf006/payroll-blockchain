import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType} from "@ngrx/effects";
import * as TransactionActions from "./transaction.actions";
import { concatMap, map, tap } from 'rxjs/operators';
import { Router } from "@angular/router";
import { TransactionService } from "../transaction.service";

@Injectable()
export class TransactionEffects {
    constructor(private actions$ : Actions,private transactionService : TransactionService,private router : Router){}

    fetchTransactionData$ = createEffect(()=>this.actions$.pipe(
        ofType(TransactionActions.fetchTransactionData),
        concatMap((payload)=>{
            return this.transactionService.fetchTransactionData(payload).pipe(
                map(response => {
                    if(response.code===0){
                        return TransactionActions.setTransactionData({transactionData : response.transactionData})
                    }else{
                        return TransactionActions.fetchTransactionDataFail()
                    }
                })
            )
        })
    ))



    authRedirect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TransactionActions.fetchTransactionDataFail),
            tap((payload) => { 
                    this.router.navigate(['/dashboard/employee'])
            })
        ), { dispatch: false }
    );


}