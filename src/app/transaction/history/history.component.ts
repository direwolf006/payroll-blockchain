import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { TransactionData } from 'src/app/models/history.model';
import { SpinnerComponent } from 'src/app/spinner/spinner.component';
import { AppState } from 'src/app/store/app.reducer';
import * as TransactionActions from "../store/transaction.actions";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit,OnDestroy {

  transactionData : TransactionData[] =null
  spinnerRef : MatDialogRef<SpinnerComponent>;
  userType : string ="Employer";
  id : string ;
  authSubscription : Subscription;
  transactionSubscription : Subscription ;
  constructor(private store : Store<AppState>,public dialog: MatDialog,private route : ActivatedRoute) { }


  ngOnInit(): void {
    this.authSubscription =  this.store.select('auth').subscribe((authState)=>{

      this.userType = authState.userType;
      if(authState.authStatus && this.userType==="Employer"){   
        this.spinnerRef = this.dialog.open(SpinnerComponent);   
        this.route.params.subscribe((params: Params) => {
          this.id = params['id'];
          console.log(this.id);
          
          this.store.dispatch(TransactionActions.fetchTransactionData({employee_id:this.id,token:authState.authData._token}))
        });  
      }else if(authState.authStatus && this.userType==="Employee"){
        this.spinnerRef = this.dialog.open(SpinnerComponent);
        this.store.dispatch(TransactionActions.fetchTransactionData({employee_id:authState.authData.id,token:authState.authData._token}))
      }
      
    })
    this.transactionSubscription = this.store.select('transaction').subscribe((state)=>{
      this.transactionData = state.transactionData
      if(this.transactionData!==null){
        this.spinnerRef.close()
      }
    })
  }

  ngOnDestroy (){
    this.authSubscription.unsubscribe()
    this.transactionSubscription.unsubscribe()
  }

}
