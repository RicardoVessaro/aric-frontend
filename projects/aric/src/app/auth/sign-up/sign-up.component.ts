import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule, 
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  @ViewChild('f') signupForm!: NgForm;

  onSubmit() {
    console.log('onSubmit');
    console.log(this.signupForm.value);
  }

}
