import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';

import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { signIn } from '../store/auth.actions';
import { Observable } from 'rxjs';
import { selectLogging } from '../store/auth.selectors';
import { State } from '../store/auth.reducer';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  signinForm !: FormGroup;
  hidePassword = true;
  logging$: Observable<boolean>;

  constructor(
    private store: Store<{auth: State}>
  ) {
    this.logging$ = store.select(selectLogging);
  }

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
