import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { EmployeesData } from 'src/app/models/employer.model';
import { AppState } from 'src/app/store/app.reducer';
import * as DashboardActions from "../../dashboard/store/dashboard.actions";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit,OnDestroy {

  employeesData : EmployeesData[] = [] ; 
  authStoreSubscription : Subscription;
  dashboardSubscription : Subscription;
  constructor(private router : Router,private route : ActivatedRoute,private store : Store<AppState>) { }

  ngOnInit(): void {
    this.authStoreSubscription = this.store.select('auth').subscribe((authState)=>{
       if(authState.authData!==null){
          this.store.dispatch(DashboardActions.fetchEmployeesData({token:authState.authData._token}))
       }
    })
    this.dashboardSubscription = this.store.select('dashboard').subscribe((dashboardState)=>{
      this.employeesData = dashboardState.employeesData
    })

  }
  value = '';

  onViewEmployee(employee_id : string){
      this.router.navigate([`employee/${employee_id}`],{relativeTo : this.route})
  }

  ngOnDestroy(){
    this.authStoreSubscription.unsubscribe()
    this.dashboardSubscription.unsubscribe()
  }

}
