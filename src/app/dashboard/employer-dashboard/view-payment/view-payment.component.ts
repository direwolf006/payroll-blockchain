import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TransactionData } from 'src/app/models/history.model';
import { AppState } from 'src/app/store/app.reducer';
import * as DashboardActions from "../../store/dashboard.actions";
import { EmployeesPaymentData } from 'src/app/models/payment.model';
import { SpinnerComponent } from 'src/app/spinner/spinner.component';
import { DashboardService } from '../../dashboard.service';
import { MakePaymentComponent } from './make-payment/make-payment.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-payment',
  templateUrl: './view-payment.component.html',
  styleUrls: ['./view-payment.component.css']
})
export class ViewPaymentComponent implements OnInit {

  employeesPaymentData : EmployeesPaymentData[] =[]
  spinnerRef : MatDialogRef<SpinnerComponent>;
  authStoreSubscription : Subscription;
  dashboardSubscription : Subscription;
  constructor(public dialog: MatDialog,private store : Store<AppState>,private dashBoardService : DashboardService) { }

  ngOnInit(): void {
    this.authStoreSubscription = this.store.select('auth').subscribe((authState)=>{
      this.store.dispatch(DashboardActions.fetchEmployeesPaymentData({token:authState.authData.token}))
    })
    this.dashboardSubscription = this.store.select('dashboard').subscribe((dashboardState)=>{
      this.employeesPaymentData = dashboardState.employeesPaymentData
      if(this.employeesPaymentData!==null){
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
      data: {employeeData: this.employeesPaymentData[index]}
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
