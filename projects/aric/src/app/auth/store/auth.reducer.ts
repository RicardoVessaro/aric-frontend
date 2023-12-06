
import { createReducer, on } from "@ngrx/store"
import { Member } from "../../shared/member.model";
import { success, signUp, signIn, error, logout, logoutSuccess } from "./auth.actions";
import { state } from "@angular/animations";

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
   on(logout, state => {
        return { ...state, member: null as any}
   }),
   on(success, (state, action) => {
        const member = new Member(
            action.username, 
            action.id, 
            action.token as string, 
            action.expirationDate
        );

        return { ...state, member: member, logging: false};
   }),
   on(error, (state, action) => {
    return {...state, logging: false}
   })
);

