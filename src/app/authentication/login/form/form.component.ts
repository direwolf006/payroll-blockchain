import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, NgForm, ValidationErrors,ValidatorFn, Validators} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { AuthService } from '../../auth.service';
import * as AuthActions from "../../store/auth.actions";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})


export class FormComponent implements OnInit,OnDestroy {


  @Input() user : string ;
  loginForm= new FormGroup({
    'email' : new FormControl('', [Validators.required, Validators.email]),
    'password' : new FormControl('', [Validators.required,Validators.minLength(6)])
  })
  
  error ={
    email : null,
    password:null
  }
  storeSubscription : Subscription;
  hide = true;

  constructor(private authService : AuthService,private store : Store<AppState>) { }

  ngOnInit(): void {

    
    this.storeSubscription = this.store.select('auth').subscribe((authState)=>{      
      if(authState.authError===1){
        this.error={
          email : false,
          password: 'Not a valid password' 
        }
        this.loginForm.get('password').setErrors({invalid : this.error.password})
      }else if(authState.authError===2){
        
        this.error={
          email : 'User not found with this email',
          password: '' 
        }
        this.loginForm.get('email').setErrors({invalid : this.error.email})
        this.loginForm.get('password').setErrors({invalid : this.error.password})
      }
    })
  }

  getErrorMessage(element : string) {
    if(element==='email'){
      if (this.loginForm.get('email').hasError('required')) {
        return 'You must enter a value';
      }
  
      return this.loginForm.get('email').hasError('email') ? 'Not a valid email' : '';
    }else{
      if (this.loginForm.get('password').hasError('required')) {
        return 'You must enter a value';
      }  
      return this.loginForm.get('password').hasError('minlength') ? 'Not a valid password' : '';
    }
    
  }

  onSubmit(){
    if(!this.loginForm.invalid){
      const loginData = {...this.loginForm.value,userType:this.user}
      
      this.store.dispatch(AuthActions.initiatelogin(loginData))
  
    }
    
  }

  ngOnDestroy(){
    if(this.storeSubscription){
      this.storeSubscription.unsubscribe()
    }else{
      this.storeSubscription.unsubscribe()
    }
    this.loginForm.reset()
  }

}
