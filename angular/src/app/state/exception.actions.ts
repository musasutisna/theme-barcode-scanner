import { createAction, props } from '@ngrx/store';

export enum ExceptionTypes {
  LOADING_OPEN = '[Exception] Loading Open',
  LOADING_CLOSE = '[Exception] Loading Close',
  NEW_MESSAGE = '[Exception] New Message',
  RESET_EXCEPTION_STATE = '[Exception] Reset Exception State'
}

export const openLoading = createAction(
  ExceptionTypes.LOADING_OPEN,
  props<{ message: string }>()
);

export const closeLoading = createAction(
  ExceptionTypes.LOADING_CLOSE
);

export const newMessage = createAction(
  ExceptionTypes.NEW_MESSAGE,
  props<{ message: string }>()
);

export const resetExceptionState = createAction(
  ExceptionTypes.RESET_EXCEPTION_STATE
);
