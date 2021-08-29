import {
  Action,
  createReducer
} from '@ngrx/store';

export interface ScannerState {
}

export const initialState: ScannerState = {
};

const scannerReducer = createReducer(
  initialState
);

export function reducer(state: ScannerState | undefined, action: Action) {
  return scannerReducer(state, action);
}
