import { createAction, props } from "@ngrx/store";

export const error = createAction(
    '[Error] error',
    props<{message: string}>()
);