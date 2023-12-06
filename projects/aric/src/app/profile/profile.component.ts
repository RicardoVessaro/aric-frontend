import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { State } from '../auth/store/auth.reducer';
import { logout } from '../auth/store/auth.actions';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(
    private store: Store<{auth: State}>
  ) {}

  onLogout() {
    this.store.dispatch(logout());
  }
}
