import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent as SalaryHistoryComponent } from '../salary/history/history.component';
import { HistoryComponent as TransactionHistoryComponent } from '../transaction/history/history.component';
import { EmployeeContainerComponent } from './employee-container/employee-container.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path:'',component:SearchComponent},
  {path:'employee/:id',component:EmployeeContainerComponent},
  {path:'employee/:id/salary',component:SalaryHistoryComponent},
  {path:'employee/:id/transaction',component:TransactionHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewEmployeesRoutingModule { }
