import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { EmployeeData, RegisterData } from 'src/app/models/employee.model';
import { EmployeesPaymentData } from 'src/app/models/payment.model';
import { AppState } from 'src/app/store/app.reducer';
import * as DashboardActions from "../../../store/dashboard.actions";
import { SpinnerComponent } from 'src/app/spinner/spinner.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class MakePaymentComponent implements OnInit {

  amount = parseInt(this.data.employeeData.base)+parseInt(this.data.employeeData.allowance)+parseInt(this.data.employeeData.specialAllowance)
  token :string;
  id :string
  authStoreSubscription : Subscription;
  dashboardSubscription : Subscription;
  bonus = new FormControl(15000, [Validators.required,Validators.min(15000)]);
  spinnerRef : MatDialogRef<SpinnerComponent>;
  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<MakePaymentComponent>,private dashboardService : DashboardService, 
    private store : Store<AppState>,private router : Router,
    @Inject(MAT_DIALOG_DATA) public data: {employeeData : EmployeesPaymentData}) { }

  ngOnInit(): void {
    this.authStoreSubscription = this.store.select('auth').subscribe((authState)=>{
      this.token = authState.authData.token
      this.id = authState.authData.id
    })
    this.dashboardSubscription = this.store.select('dashboard').subscribe((dashboardState)=>{
      let payEmployeeStatus = dashboardState.payEmployeeStatus
      if(payEmployeeStatus){
        this.spinnerRef.close()
        this.dialogRef.close()
        this.router.navigate(['/dashboard/employer'])
        this.store.dispatch(DashboardActions.clearPayEmployeeSuccess())
      }
    })
  }

  openSpinner(): void {
    this.spinnerRef = this.dialog.open(SpinnerComponent);
    
  }

  payEmployee(){
    this.data.employeeData={
      ...this.data.employeeData,
      bonus : this.bonus.value.toString(),
      datetime : new Date().getTime().toString()
    }
    this.openSpinner()
    console.log("Opening Make Payment Spinner");
    this.store.dispatch(DashboardActions.payEmployee({paymentData: this.data.employeeData,token : this.token }))
  }

  ngOnDestroy(){
    this.authStoreSubscription.unsubscribe()
    this.dashboardSubscription.unsubscribe()
  }

}
