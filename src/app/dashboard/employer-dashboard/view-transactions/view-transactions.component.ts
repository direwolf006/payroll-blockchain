import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { TransactionData } from 'src/app/models/history.model';
import { EmployeesPaymentData } from 'src/app/models/payment.model';
import { SpinnerComponent } from 'src/app/spinner/spinner.component';
import { AppState } from 'src/app/store/app.reducer';
import { DashboardService } from '../../dashboard.service';
import * as DashboardActions from "../../store/dashboard.actions";
import { MakePaymentComponent } from '../view-payment/make-payment/make-payment.component';

@Component({
  selector: 'app-view-transactions',
  templateUrl: './view-transactions.component.html',
  styleUrls: ['./view-transactions.component.css']
})
export class ViewTransactionsComponent implements OnInit {

  allTransactions : TransactionData[] =[]
  spinnerRef : MatDialogRef<SpinnerComponent>;
  authStoreSubscription : Subscription;
  dashboardSubscription : Subscription;
  constructor(public dialog: MatDialog,private store : Store<AppState>,private dashBoardService : DashboardService) { }

  ngOnInit(): void {
    this.authStoreSubscription = this.store.select('auth').subscribe((authState)=>{
      this.store.dispatch(DashboardActions.fetchTransactionsData({token:authState.authData.token}))
    })
    this.dashboardSubscription = this.store.select('dashboard').subscribe((dashboardState)=>{
      this.allTransactions = dashboardState.employeesTransactionsData
      console.log(this.allTransactions);
      
      if(this.allTransactions!==null ){
        if(this.spinnerRef!==undefined){
          this.spinnerRef.close()
        }
        
      }else{
        this.openSpinner()
      }
      
    })
  }

  openSpinner(): void {
    this.spinnerRef = this.dialog.open(SpinnerComponent);
    
  }

  openBonusEdit(index): void {
    const dialogRef = this.dialog.open(MakePaymentComponent, {
      data: {employeeData: this.allTransactions[index]}
    });
  }

  parseVal(input){
    return parseInt(input)
  }

  ngOnDestroy(){
    this.authStoreSubscription.unsubscribe()
    this.dashboardSubscription.unsubscribe()
  }
}
