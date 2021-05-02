import { Component, Input, OnChanges, OnInit,ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ChartOptions, ChartType ,ChartDataSets } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DetailsDialogComponent } from './details-dialog/details-dialog.component';
import { SalaryDialogComponent } from './salary-dialog/salary-dialog.component';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { EmployeeData } from 'src/app/models/employee.model';
import { intialState } from '../store/dashboard.reducer';
import * as DashboardActions from "../store/dashboard.actions";
import { SpinnerComponent } from 'src/app/spinner/spinner.component';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class EmployeeDashboardComponent implements OnInit {

  authStoreSubscription : Subscription;
  dashboardStoreSubscription : Subscription;
  userType : string ="Employer";
  id : string ;
  employeeData : EmployeeData =intialState.employeeData
  public monthStatsType: ChartType = 'doughnut';
  public arrivalStatsType: ChartType = 'doughnut';
  public monthStatsLabel: Label[] = ['Present', 'Leave'];
  public monthStatsData: MultiDataSet = [[0,0]];
  public arrivalStatsLabel: Label[] = ['On Time', 'Late'];
  public arrivalStatsData: MultiDataSet = [[0,0]]
  spinnerRef : MatDialogRef<SpinnerComponent>;

  constructor(private router : Router,private route : ActivatedRoute,
    public dialog: MatDialog,private store : Store<AppState>) { }

  ngOnInit(): void {
    console.log("Opening Employee Dasboard Spinner");
    
    this.openSpinner()  
    setTimeout(() => {
      this.spinnerRef.close()
    }, 3000);    
    this.authStoreSubscription = this.store.select('auth').subscribe((authState)=>{
      this.userType = authState.userType;
      if(authState.authStatus && this.userType==="Employer"){      
        this.route.params.subscribe((params: Params) => {
          this.id = params['id'];
          this.store.dispatch(DashboardActions.fetchEmployeeData({employee_id:this.id,token: authState.authData._token}))
        });  
      }else if(authState.authStatus && this.userType==="Employee"){
        this.store.dispatch(DashboardActions.fetchEmployeeData({employee_id:authState.authData.id,token: authState.authData._token}))
      }
    })
    this.dashboardStoreSubscription =this.store.select('dashboard').subscribe((dashboardState)=>{   
      if(dashboardState.employeeData.salary.allowance!==null){
        
      }
      this.employeeData = dashboardState.employeeData
      this.refreshChartData()
    })
  }

  public options: ChartOptions = {
    legend: {
      display: true,
      position: 'right' 
    }
  }

  public pieChartColors: Array < any > = [{
    backgroundColor: ['#d67f45', '#a92574'],
 }];

  public lineChartData: ChartDataSets[] = [
    { 
      data: [65, 59, 80, 81, 56, 55, 40],
      label: 'Salary',
      backgroundColor: ['rgb(255, 99, 132)','rgb(0, 255, 0)','rgb(255, 99, 132)','rgb(128, 255, 0)','rgb(0, 255, 255)','rgb(255, 255, 0)','rgb(255, 255, 128)'],
    }
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartType: ChartType = 'line';
  public lineChartOptions: ChartOptions = {
    elements : {
      line : {
        tension : 0
      }
    }
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  }


  refreshChartData(){
    
    this.monthStatsLabel= ['Present', 'Leave'];
    this.monthStatsData = [
      [+this.employeeData.leaveStats.present,+this.employeeData.leaveStats.leave]
    ];
  
    this.arrivalStatsLabel= ['On Time', 'Late'];
    this.arrivalStatsData = [
      [+this.employeeData.arrivalTimings.onTime,+this.employeeData.arrivalTimings.late]
    ];
  }

  onViewSalaryHistory(){
    this.router.navigate(['salary'],{relativeTo: this.route})
  }

  onViewTransactionHistory(){
    this.router.navigate(['transaction'],{relativeTo: this.route})
  }

  openDetailsEdit(): void {
    const dialogRef = this.dialog.open(DetailsDialogComponent, {
      data : {
        id : this.employeeData.about.id,
        name : this.employeeData.about.name,
        department : this.employeeData.about.department,
        designation : this.employeeData.about.designation
      }
    });

  }

  openSalaryEdit(){
    const dialogRef = this.dialog.open(SalaryDialogComponent, {
      data : {
        employeeData:this.employeeData
      }
    });
  }

  openSpinner(): void {
    this.spinnerRef = this.dialog.open(SpinnerComponent);
    
  }

  ngOnDestroy(){
    // if(this.storeSubscription){
    //   this.storeSubscription.unsubscribe()
    // }else{
    //   this.storeSubscription.unsubscribe()
    // }
    this.authStoreSubscription.unsubscribe()
    this.dashboardStoreSubscription.unsubscribe()
  }

}
