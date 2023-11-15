import { createSelector } from "@ngrx/store";
import { State } from "./error.reducer";

export const selectError = (state: { error : State }) => state.error;

export const selectErrorMessage = createSelector(
    selectError,
    (state) => state.message
);