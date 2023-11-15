import { Injectable } from "@angular/core";
import { createEffect, ofType } from "@ngrx/effects";
import { Actions } from "@ngrx/effects";
import { error, signIn, signUp, success } from "./auth.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Member } from "../../shared/member.model";
import { Router } from "@angular/router";
import * as errorAction from "../../error/store/error.action";

interface AuthResponse {
    userId: string,
    token: string,
    username: string,
    expiresIn: number
}

@Injectable()
export class AuthEffects {
    private AUTH_URL = '/aric/api/v1/auth';

    authSignup = createEffect(() => this.actions$.pipe(
        ofType(signUp),
        switchMap(params => {
            return this.http.post<AuthResponse>(
                this.AUTH_URL + '/register',
                {
                    name: params.name,
                    username: params.username,
                    password: params.password,
                    email: params.email
                }
            )
            .pipe(
                // tap(response => {
                //     // TODO set logout timer
                // }),
                map(response => {
                    return this.handleAuthentication(response);
                }),
                catchError(err => {
                    return this.handleError(err);
                })
            )
        }
    )));

    authSignin = createEffect(() => this.actions$.pipe(
        ofType(signIn),
        switchMap(params => {
            return this.http.post<AuthResponse>(
                this.AUTH_URL + '/authenticate',
                {
                    username: params.username,
                    password: params.password
                }
            )
            .pipe(
                map(response => {
                    return this.handleAuthentication(response);
                }),
                catchError(err => {
                    return this.handleError(err);
                })
            )
        })
    ));

    authSucces = createEffect(() => this.actions$.pipe(
        ofType(success),
        tap(() => {
            this.router.navigate(['/']);
        })
    ), {dispatch: false});

    authError = createEffect(() => this.actions$.pipe(
        ofType(error),
        switchMap((err) => {
            return of(errorAction.error(err))
        })
    ))

    handleAuthentication(response: AuthResponse) {
        const expirationDate = new Date(new Date().getTime() + response.expiresIn);
        const member = new Member(response.username, response.userId, response.token, expirationDate);
        localStorage.setItem('member', JSON.stringify(member));

        return success(member);
    }

    handleError(err: any) {
        let message = 'Authentication failed.'
        if(err.error && err.error.message) {
            message = err.error.message;
        }
        return of(error({message: message}));
    }

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router
    ) {}
}