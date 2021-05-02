import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewEmployeesRoutingModule } from './view-employees-routing.module';
import { SearchComponent } from './search/search.component';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { EmployeeContainerComponent } from './employee-container/employee-container.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { SalaryModule } from '../salary/salary.module';


@NgModule({
  declarations: [SearchComponent, EmployeeContainerComponent],
  imports: [
    CommonModule,
    DashboardModule,    
    ViewEmployeesRoutingModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    SalaryModule
  ]
})
export class ViewEmployeesModule { }
