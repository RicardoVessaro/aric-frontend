import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { signUp } from '../store/auth.actions';
import { RouterModule } from '@angular/router';

type err = {
  [s: string]: boolean;
};

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private store: Store
  ) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, this.passwordPattern]),
      'confirmPassword': new FormControl('', [Validators.required, this.passwordMatch.bind(this)]),
    });
  }

  onSubmit() {
    this.store.dispatch(signUp(this.signupForm.value));
  }

  passwordMatch(control: FormControl) : err {
    if(this.signupForm 
        && control.value !== this.signupForm.get('password')!.value) {
      
      return {'passwordsMustMatch' : true};
    }

    return null as any;
  }

  passwordPattern(control: FormControl) : err {
    let error : err = {};
    let matches = false;

    if(!new RegExp('([a-z])').test(control.value)) {
      matches = true;
      error = { ...error, 'lowercase': true } 
    }

    if(!new RegExp('([A-Z])').test(control.value)) {
      matches = true;
      error = { ...error, 'uppercase': true } 
    }

    if(!new RegExp('([\\d])').test(control.value)) {
      matches = true;
      error = { ...error, 'number': true } 
    }

    if(!new RegExp('([@$!%*?&])').test(control.value)) {
      matches = true;
      error = { ...error, 'specialCharacter': true } 
    }

    if (matches) {
      return error;
    } 

    return null as any;
  }

  formHasError(formControlName:string, errorCode:string) {
    const control = this.signupForm.get(formControlName);

    return control 
      && control.hasError(errorCode)
      && control.touched;
  }

}
