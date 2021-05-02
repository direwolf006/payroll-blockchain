import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { HistoryComponent } from './history/history.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    MatExpansionModule,
    MatDialogModule,
    MatIconModule,
    MatListModule
  ]
})
export class TransactionModule { }
