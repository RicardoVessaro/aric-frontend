import { createAction, props } from "@ngrx/store";
import { Member } from "../../shared/member.model";

export const signUp = createAction(
    '[Auth] signUp',
    props<{
        username: string,
        name: string,
        email: string,
        password: string
    }>()
);

export const signIn = createAction(
    '[Auth] signIn' ,
    props<{
        username: string,
        password: string
    }>()
)

export const logout = createAction(
    '[Auth] logout'
)

export const logoutSuccess = createAction(
    '[Auth] logoutSuccess'
)

export const success = createAction(
    '[Auth] success',
    props<Member>()
)

export const error = createAction(
    '[Auth] error',
    props<{message: string}>()
)