import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { EmployeeData, EmployeeSalaryData } from 'src/app/models/employee.model';
import { SpinnerComponent } from 'src/app/spinner/spinner.component';
import { AppState } from 'src/app/store/app.reducer';
import * as DashboardActions from "../../store/dashboard.actions";

@Component({
  selector: 'app-salary-dialog',
  templateUrl: './salary-dialog.component.html',
  styleUrls: ['./salary-dialog.component.css'],
  encapsulation: ViewEncapsulation.None 

})
export class SalaryDialogComponent implements OnInit,OnDestroy {

  authStoreSubscription : Subscription;
  dashboardSubscription : Subscription;

  salaryForm = new FormGroup({
    'base' : new FormControl(+this.data.employeeData.salary.base, [Validators.required,Validators.min(+this.data.employeeData.salary.base)]),
    'allowance' : new FormControl(+this.data.employeeData.salary.allowance, [Validators.required,Validators.min(+this.data.employeeData.salary.allowance)]),
    'specialAllowance' : new FormControl(+this.data.employeeData.salary.specialAllowance, [Validators.required,Validators.min(+this.data.employeeData.salary.specialAllowance)]),
  })
  spinnerRef : MatDialogRef<SpinnerComponent>;
  token : string ;
  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<SalaryDialogComponent>,private store : Store<AppState>,private route : ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: {employeeData : EmployeeData}) { }

  ngOnInit(): void {
    this.authStoreSubscription = this.store.select('auth').subscribe((authState)=>{
      this.token = authState.authData.token
    })
    this.dashboardSubscription = this.store.select('dashboard').subscribe((dashboardState)=>{
      let updateEmployeeStatus = dashboardState.updateEmployeeStatus
      if(updateEmployeeStatus){
        this.store.dispatch(DashboardActions.fetchEmployeeData({employee_id:this.data.employeeData.about.id,token: this.token}))
        this.spinnerRef.close()
        this.dialogRef.close()
        this.store.dispatch(DashboardActions.clearUpdateEmployeeSalarySucess())
      }
    })
  }

  getErrorMessage(element : string) {
    if(element==="base"){
      if(this.salaryForm.get('base').hasError('required')){
        return 'Base is required' 
      }
      return this.salaryForm.get('base').hasError('min') ? 'Base can only increase' : ''
    }else if(element==="allowance"){
      if(this.salaryForm.get('allowance').hasError('required')){
        return 'Allowance is required' 
      }
      return this.salaryForm.get('allowance').hasError('min') ? 'Allowance can only increase' : ''
    }else if(element==="specialAllowance"){
      if(this.salaryForm.get('specialAllowance').hasError('required')){
        return 'Special Allowance is required' 
      }
      return this.salaryForm.get('specialAllowance').hasError('min') ? 'Special Allowance can only increase' : ''
    }else if(element==="gross"){
      if(this.salaryForm.get('gross').hasError('required')){
        return 'Gross is required' 
      }
      return this.salaryForm.get('gross').hasError('min') ? 'Gross can only increase' : ''
    } 
  }

  openSpinner(): void {
    this.spinnerRef = this.dialog.open(SpinnerComponent);
    
  }

  updateSalary(){
    if(!this.salaryForm.invalid){
      let updatedData = {
        name : this.data.employeeData.about.name,
        employee_id:this.data.employeeData.about.id,
        IFSCCode:this.data.employeeData.bankDetails.IFSCCode,
        accountNumber:this.data.employeeData.bankDetails.accountNumber,
        allowance:this.salaryForm.value.allowance.toString(),
        bankName:this.data.employeeData.bankDetails.bankName,
        base:this.salaryForm.value.base.toString(),
        branch:this.data.employeeData.bankDetails.branch,
        specialAllowance: this.salaryForm.value.specialAllowance.toString()
      }    
      this.openSpinner()
      console.log("Opening Salary Dialog Spinner");
      this.store.dispatch(DashboardActions.updateEmployeeSalary({token:this.token,updatedData : updatedData}))
    }
  }

  ngOnDestroy(){
    this.authStoreSubscription.unsubscribe()
    this.dashboardSubscription.unsubscribe()
  }

}
