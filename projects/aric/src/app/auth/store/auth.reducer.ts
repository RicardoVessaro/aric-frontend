
import { createReducer, on } from "@ngrx/store"
import { Member } from "../../shared/member.model";
import { success, signUp, signIn, error } from "./auth.actions";

export interface State {
    member: Member;
    logging: boolean;
}

const initialState: State = {
    member: null as any,
    logging: false
}

export const authReducer = createReducer(
   initialState,
   on(signUp, state => {
        return {...state, logging: true}
   }),
   on(signIn, state => {
    return {...state, logging: true}
   }),
   on(success, (state, action) => {
        return { member: action, logging: false}
   }),
   on(error, (state, action) => {
    return {...state, logging: false}
   })
);

