import { createReducer, on } from "@ngrx/store";
import { error } from "./error.action";

export interface State {
    message: string
}

const initialState: State = {
    message: null as any
}

export const errorReducer = createReducer(
    initialState,
    on(error, (state, action) => {
        return { message: action.message }
    })
);