import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState, MediaMatcher } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { Subscription } from 'rxjs';
import * as AuthActions from "../authentication/store/auth.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  matcher: MediaQueryList;
  widthChange;
  /**
   * Breakpoints and Orientation provided 
   * via the 'layout' cdk.
   */
  viewportSizes = [
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge,
  ];
   /**
   * Our local boolean variables to
   * declare is we are within certain
   * breakpoints.
   */
    isXSmall: boolean;
    isSmall: boolean;
    isMedium: boolean;
    isLarge: boolean;
    isXLarge: boolean;

    storeSubscription : Subscription;
    userType : string =null;
  
    constructor(
      public breakpointObserver: BreakpointObserver,
      public mediaMatcher: MediaMatcher,
      private store : Store<AppState>
    ) {
  
  
    this.widthChange = breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ])
    .subscribe((state: BreakpointState) => {
      this.isXSmall = breakpointObserver.isMatched(Breakpoints.XSmall);
      this.isSmall = breakpointObserver.isMatched(Breakpoints.Small);
      this.isMedium = breakpointObserver.isMatched(Breakpoints.Medium);
      this.isLarge = breakpointObserver.isMatched(Breakpoints.Large);
      this.isXLarge = breakpointObserver.isMatched(Breakpoints.XLarge);
    })
    }

  loggedIn : boolean = false;
  ngOnInit(): void {
    this.storeSubscription = this.store.select('auth').subscribe((authState)=>{
      this.loggedIn = authState.authStatus;
      this.userType = authState.userType;
    })

  }

  ngOnDestroy(){
    if(this.storeSubscription){
      this.storeSubscription.unsubscribe()
    }else{
      this.storeSubscription.unsubscribe()
    }
  }

  onLogout(){
    
    this.store.dispatch(AuthActions.logout());
  }

}
