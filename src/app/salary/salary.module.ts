import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryRoutingModule } from './salary-routing.module';
import { HistoryComponent } from './history/history.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    SalaryRoutingModule,
    MatExpansionModule,
    MatIconModule,
    MatDialogModule ,
    MatListModule
  ],
  exports:[
    HistoryComponent
  ]
})
export class SalaryModule { }
