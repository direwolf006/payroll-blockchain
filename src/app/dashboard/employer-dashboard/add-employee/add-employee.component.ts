import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SpinnerComponent } from 'src/app/spinner/spinner.component';
import { AppState } from 'src/app/store/app.reducer';
import * as DashboardActions from "../../store/dashboard.actions";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit,OnDestroy{

  authStoreSubscription : Subscription;
  dashboardSubscription : Subscription;
  token : string ;
  spinnerRef : MatDialogRef<SpinnerComponent>;
  addEmployeeForm = new FormGroup({
    'name' : new FormControl('',[Validators.required]),
    'department' : new FormControl('',[Validators.required]),
    'designation' : new FormControl('',[Validators.required]),
    'email' : new FormControl('',[Validators.required,Validators.email]),
    'password' : new FormControl('',[Validators.required,Validators.minLength(6)]),
    'bankName' : new FormControl('',[Validators.required]),
    'accountNumber' : new FormControl('',[Validators.required]),
    'IFSCCode' : new FormControl('',[Validators.required]),
    'branch' : new FormControl('',[Validators.required]),
    'base' : new FormControl('',[Validators.required]),
    'allowance' : new FormControl('',[Validators.required]),
    'specialAllowance' : new FormControl('',[Validators.required]),
  })
  constructor(private store : Store<AppState>,public dialog: MatDialog,private router : Router) { }

  ngOnInit(): void {
    this.authStoreSubscription = this.store.select('auth').subscribe((state)=>{
      this.token = state.authData.token
    })
    this.dashboardSubscription = this.store.select('dashboard').subscribe((state)=>{
      if(state.addEmployeeStatus){
        if(this.spinnerRef!==undefined){
        
          this.spinnerRef.close()
        }
        this.store.dispatch(DashboardActions.clearEmployeeSuccess())
        this.router.navigate(['/dashboard/employer'])

      }
    })
  }

  onAddEmployee(){
    if(!this.addEmployeeForm.invalid){
      this.openSpinner()
      console.log("Opening Add Employee Spinner");
      this.store.dispatch(DashboardActions.addEmployee({employeeData : this.addEmployeeForm.value,token:this.token}))
      
    }
  }

  openSpinner(): void {
    this.spinnerRef = this.dialog.open(SpinnerComponent);
    
  }

  ngOnDestroy(){
    this.authStoreSubscription.unsubscribe()
    this.dashboardSubscription.unsubscribe()
  }

  
}
