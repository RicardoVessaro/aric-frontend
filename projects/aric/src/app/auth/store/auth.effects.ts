import { Injectable } from "@angular/core";
import { createEffect, ofType } from "@ngrx/effects";
import { Actions } from "@ngrx/effects";
import { error, logout, logoutSuccess, signIn, signUp, success } from "./auth.actions";
import { Observable, catchError, map, of, switchMap, take, tap } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Member } from "../../shared/member.model";
import { Router } from "@angular/router";
import * as errorAction from "../../error/store/error.action";
import { Store } from "@ngrx/store";
import { selectToken } from "./auth.selectors";
import { State } from "./auth.reducer";

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

    authLogout = createEffect(() => this.actions$.pipe (
        ofType(logout),
        tap(() => {
                const member = JSON.parse(localStorage.getItem('member') as string);

                const token = member._token;

                this.http.get(
                    this.AUTH_URL + '/logout',
                    {
                        'headers': new HttpHeaders({'Authorization': 'Bearer ' + token})
                    }
                )
                .pipe(
                    tap(() => {
                        localStorage.removeItem('member');
                        this.router.navigate(['/']);
                    }),  
                    catchError(err => {
                        return this.handleError(err);
                    }),
                    take(1)
                ).subscribe();
        })
    ), {dispatch: false});

    authSucces = createEffect(() => this.actions$.pipe(
        ofType(success),
        tap(() => {
            this.router.navigate(['/profile']);
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
        private router: Router,
        private store: Store<{auth: State}>
    ) {}
}