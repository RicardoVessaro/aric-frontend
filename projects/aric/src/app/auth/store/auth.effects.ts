import { Injectable } from "@angular/core";
import { createEffect, ofType } from "@ngrx/effects";
import { Actions } from "@ngrx/effects";
import { signUp, success } from "./auth.actions";
import { map, switchMap, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";
import { Member } from "../../shared/member.model";
import { Router } from "@angular/router";

interface AuthResponse {
    userId: string,
    token: string,
    username: string,
    expiresIn: number
}

@Injectable()
export class AuthEffects {
    private AUTH_URL = '/aric/api/v1/auth';

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router
    ) {}

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
                })
            )
        }
    )))

    authSucces = createEffect(() => this.actions$.pipe(
        ofType(success),
        tap((params) => {
            this.router.navigate(['/']);
        })
    ), {dispatch: false})

    handleAuthentication(response: AuthResponse) {
        const expirationDate = new Date(new Date().getTime() + response.expiresIn);
        const member = new Member(response.username, response.userId, response.token, expirationDate);
        localStorage.setItem('member', JSON.stringify(member));

        return success(member);
    }
}