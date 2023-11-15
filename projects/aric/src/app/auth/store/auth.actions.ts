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

export const success = createAction(
    '[Auth] success',
    props<Member>()
)
