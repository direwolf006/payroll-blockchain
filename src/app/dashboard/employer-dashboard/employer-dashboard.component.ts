import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartOptions, ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-employer-dashboard',
  templateUrl: './employer-dashboard.component.html',
  styleUrls: ['./employer-dashboard.component.css']
})
export class EmployerDashboardComponent implements OnInit {

  constructor(private router : Router,private route : ActivatedRoute) { }

  ngOnInit(): void {
  }

  public options: ChartOptions = {
    legend: {
      display: true,
      position: 'right' 
    }
  }
  public monthStatsLabel: Label[] = ['Remaining', 'Present', 'Leave'];
  public monthStatsData: MultiDataSet = [
    [6,22,2]
  ];

  public arrivalStatsLabel: Label[] = ['Remaining', 'On Time', 'Late'];
  public arrivalStatsData: MultiDataSet = [
    [6,20,2]
  ];

  public monthStatsType: ChartType = 'doughnut';
  public arrivalStatsType: ChartType = 'doughnut';

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  }

  onViewEmployees(){
    this.router.navigate(['./search'])
  }

  onAddEmployee(){
    this.router.navigate(['add_employee'],{relativeTo:this.route})
  }

  onViewPayment(){
    this.router.navigate(['payment'],{relativeTo:this.route})
  }
  
  onViewTransactions(){
    this.router.navigate(['transactions'],{relativeTo:this.route})
  }

}
