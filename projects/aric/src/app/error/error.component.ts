import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { State } from './store/error.reducer';
import { Store } from '@ngrx/store';
import { selectError, selectErrorMessage } from './store/error.selectors';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  errorMessage$: Observable<string>;

  constructor(private store: Store<{error: State}>) {
    this.errorMessage$ = store.select(selectErrorMessage);
  }
}
