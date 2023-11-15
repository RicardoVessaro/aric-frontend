import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { error } from "./error.action";
import { tap } from "rxjs";
import {MatSnackBar} from '@angular/material/snack-bar';
import { ErrorComponent } from "../error.component";

@Injectable()
export class ErrorEffects {
    durationInSeconds = 5;
    
    showError = createEffect(() => this.actions$.pipe(
        ofType(error),
        tap(() => {
            this.snackbar.openFromComponent(ErrorComponent, {
                duration: this.durationInSeconds * 1000
            });
        })
    ), {dispatch: false});

    constructor(
        private actions$: Actions,
        private snackbar: MatSnackBar
    ) {}
}