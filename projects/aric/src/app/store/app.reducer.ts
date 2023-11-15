import { ActionReducerMap, createReducer } from "@ngrx/store";
import * as fromAuth from "../auth/store/auth.reducer";
import * as fromError from "../error/store/error.reducer";

export interface AppState {
    auth: fromAuth.State;
    error: fromError.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    error: fromError.errorReducer
}