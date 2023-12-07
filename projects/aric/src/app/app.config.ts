import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideStore } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withRequestsMadeViaParent } from '@angular/common/http';
import { ErrorEffects } from './error/store/error.effects';
import { authInterceptor } from './auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimations(),
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    provideStore(fromApp.appReducer),
    provideEffects([
      AuthEffects,
      ErrorEffects
    ]),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
  ]
};
