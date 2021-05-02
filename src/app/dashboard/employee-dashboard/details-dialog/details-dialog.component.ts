import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { EmployeeAboutData } from 'src/app/models/employee.model';
import { AppState } from 'src/app/store/app.reducer';
import * as DashboardActions from "../../store/dashboard.actions";

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.css'],
  encapsulation: ViewEncapsulation.None 

})
export class DetailsDialogComponent implements OnInit {

  updatedData : EmployeeAboutData;
  aboutForm = new FormGroup({
    'name' : new FormControl(this.data.name, [Validators.required]),
    'department' : new FormControl(this.data.department, [Validators.required]),
    'designation' : new FormControl(this.data.designation, [Validators.required])
  })
  token : string;
  

  constructor(public dialogRef: MatDialogRef<DetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeAboutData,private store : Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe((authState)=>{
      this.token=authState.authData._token
    })
  }

  updateDetails(){
    if(!this.aboutForm.invalid){
      this.updatedData={
        id : this.data.id,
        name : this.aboutForm.value.name,
        department : this.aboutForm.value.department,
        designation : this.aboutForm.value.designation
      }
      this.store.dispatch(DashboardActions.updateEmployeeAboutData({employeeAboutData:this.updatedData,token:this.token}))
      this.dialogRef.close()
    }
  }

  getErrorMessage(element : string) {
    if(element==="name"){
      return this.aboutForm.get('name').hasError('required') ? 'Name is required' : ''
    }else if(element==="department"){
      return this.aboutForm.get('department').hasError('required') ? 'Department is required' : ''
    }else if(element==="designation"){
      return this.aboutForm.get('designation').hasError('required') ? 'Designation is required' : ''
    }  
  }

}
