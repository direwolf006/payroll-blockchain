import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducer';
import * as AuthActions from "./authentication/store/auth.actions";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'payroll-blockchain';

  constructor(private store : Store<AppState>){}
  ngOnInit(){
    this.store.dispatch(AuthActions.autoLogin());

  }
  
}
