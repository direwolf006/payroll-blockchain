import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { EmployerDashboardComponent } from './employer-dashboard/employer-dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { ChartsModule} from 'ng2-charts';
import { MatRadioModule } from "@angular/material/radio";
import { MatButtonModule } from '@angular/material/button';
import { AddEmployeeComponent } from './employer-dashboard/add-employee/add-employee.component';
import { ViewPaymentComponent } from './employer-dashboard/view-payment/view-payment.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { DetailsDialogComponent } from './employee-dashboard/details-dialog/details-dialog.component';
import { SalaryDialogComponent } from './employee-dashboard/salary-dialog/salary-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MakePaymentComponent } from './employer-dashboard/view-payment/make-payment/make-payment.component';
import { ViewTransactionsComponent } from './employer-dashboard/view-transactions/view-transactions.component';


@NgModule({
  declarations: [
    EmployeeDashboardComponent,
    EmployerDashboardComponent,
    AddEmployeeComponent,
    ViewPaymentComponent,
    DetailsDialogComponent,
    SalaryDialogComponent,
    MakePaymentComponent,
    ViewTransactionsComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule,
    MatListModule,
    ChartsModule,
    MatRadioModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatDialogModule,
  ],
  exports: [EmployeeDashboardComponent],
})
export class DashboardModule {}
