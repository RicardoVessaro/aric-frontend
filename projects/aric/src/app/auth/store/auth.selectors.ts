import { createSelector } from "@ngrx/store";
import { State } from "./auth.reducer";

export const selectAuth = (state: { auth : State}) => state.auth;
export const selectLogging = createSelector(
    selectAuth,
    (state) => state.logging
);