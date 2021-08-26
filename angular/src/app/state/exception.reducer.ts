import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on
} from '@ngrx/store';
import * as exceptionActions from '@state/exception.actions';

export interface ExceptionState {
  loading: {
    state: boolean,
    message: string
  },
  message: {
    state: boolean,
    message: any
  }
}

export const initialState: ExceptionState = {
  loading: {
    state: false,
    message: ''
  },
  message: {
    state: false,
    message: false
  }
};

const exceptionReducer = createReducer(
  initialState,
  on(
    exceptionActions.openLoading,
    (state, action) => ({
      ...state,
      loading: {
        state: true,
        message: action.message
      }
    })
  ),
  on(
    exceptionActions.closeLoading,
    (state) => ({
      ...state,
      loading: {
        state: false,
        message: ''
      }
    })
  ),
  on(
    exceptionActions.newMessage,
    (state, action) => ({
      ...state,
      message: {
        state: action.message ? true : false,
        message: action.message
      }
    })
  ),
  on(
    exceptionActions.resetExceptionState,
    () => ({
      ...initialState
    })
  )
);

export function reducer(state: ExceptionState | undefined, action: Action) {
  return exceptionReducer(state, action);
}

const getLoadingFeatureState = createFeatureSelector<ExceptionState>('loading');

export const selectLoading = createSelector(
  getLoadingFeatureState,
  (state: ExceptionState) => state.loading
);

export const selectMessage = createSelector(
  getLoadingFeatureState,
  (state: ExceptionState) => state.message
);
