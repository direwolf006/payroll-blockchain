import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SalaryData } from 'src/app/models/history.model';
import { SpinnerComponent } from 'src/app/spinner/spinner.component';
import { AppState } from 'src/app/store/app.reducer';
import * as SalaryActions from '../store/salary.actions';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit,OnDestroy {

  salaryData : SalaryData[] =[]
  spinnerRef : MatDialogRef<SpinnerComponent>;
  userType : string ="Employer";
  id : string ;
  authSubscription : Subscription;
  salarySubscription : Subscription;
  constructor(private store : Store<AppState>,public dialog: MatDialog,private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.authSubscription = this.store.select('auth').subscribe((authState)=>{
      this.userType = authState.userType;
      if(authState.authStatus && this.userType==="Employer"){   
        this.openSpinner() 
        this.route.params.subscribe((params: Params) => {
          this.id = params['id'];
          console.log(this.id);
          this.store.dispatch(SalaryActions.fetchSalaryData({employee_id:this.id,token:authState.authData._token}))
        });  
      }else if(authState.authStatus && this.userType==="Employee"){
        this.openSpinner()
        this.store.dispatch(SalaryActions.fetchSalaryData({employee_id:authState.authData.id,token:authState.authData._token}))

      }
    })
    this.salarySubscription = this.store.select('salary').subscribe((state)=>{
      
      this.salaryData = state.salaryData
      if(this.salaryData!==null){
        this.spinnerRef.close()
      }
    })
  }

  openSpinner(): void {
    this.spinnerRef = this.dialog.open(SpinnerComponent);
    
  }


  ngOnDestroy(){
    this.authSubscription.unsubscribe()
    this.salarySubscription.unsubscribe()
  }



}
