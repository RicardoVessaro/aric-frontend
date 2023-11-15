import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { signIn } from '../store/auth.actions';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  signinForm !: FormGroup;
  hidePassword = true;

  constructor(
    private store: Store
  ) {}

  ngOnInit() {
    this.signinForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
    })
  }

  onSubmit() {
    this.store.dispatch(signIn(this.signinForm.value));
  }

  formHasError(formControlName:string, errorCode:string) {
    const control = this.signinForm.get(formControlName);

    return control 
      && control.hasError(errorCode)
      && control.touched;
  }
}
