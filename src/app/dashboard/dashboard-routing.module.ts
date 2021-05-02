import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { AddEmployeeComponent } from './employer-dashboard/add-employee/add-employee.component';
import { EmployerDashboardComponent } from './employer-dashboard/employer-dashboard.component';
import { ViewPaymentComponent } from './employer-dashboard/view-payment/view-payment.component';
import { ViewTransactionsComponent } from './employer-dashboard/view-transactions/view-transactions.component';

const routes: Routes = [
  {path:'employee',component:EmployeeDashboardComponent},
  {path:'employer',component:EmployerDashboardComponent},
  {path:'employee/salary',loadChildren: () => import('../salary/salary.module').then(module => module.SalaryModule)},
  {path:'employee/transaction',loadChildren: () => import('../transaction/transaction.module').then(module => module.TransactionModule)},
  {path:'employer/add_employee',component:AddEmployeeComponent},
  {path:'employer/payment',component:ViewPaymentComponent},
  {path:'employer/transactions',component:ViewTransactionsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
