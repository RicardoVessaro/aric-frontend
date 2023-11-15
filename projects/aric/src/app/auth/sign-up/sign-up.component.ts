import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

import { signUp } from '../store/auth.actions';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule, 
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatSnackBarModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  constructor(
    private store: Store
  ) {}

  @ViewChild('f') signupForm!: NgForm;

  onSubmit() {
    console.log('onSubmit');
    console.log(this.signupForm.value);
    this.store.dispatch(signUp(this.signupForm.value));
  }

}
