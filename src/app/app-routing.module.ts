import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  {path:'',redirectTo:'auth',pathMatch:"full"},
  {path:'auth',loadChildren: () => import('./authentication/authentication.module').then(module => module.AuthenticationModule)},
  {path:'dashboard',loadChildren: () => import('./dashboard/dashboard.module').then(module => module.DashboardModule)},
  {path:'search',loadChildren: () => import('./view-employees/view-employees.module').then(module => module.ViewEmployeesModule)},
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

