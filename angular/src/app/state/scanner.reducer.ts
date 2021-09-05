import {
  Action,
  createReducer,
  on,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { Data } from '@models/data.model';
import * as scannerActions from '@state/scanner.actions';

export interface ScannerState {
  histories: Data[],
  load: {
    allowToLoad: boolean,
    offset: number,
    length: number,
    total: number
  }
}

export const initialState: ScannerState = {
  histories: [],
  load: {
    allowToLoad: true,
    offset: 0,
    length: 10,
    total: 0
  }
};

const scannerReducer = createReducer(
  initialState,
  on(
    scannerActions.loadHistory,
    (state, action) => ({
      ...state,
      load: {
        ...state.load,
        offset: action.offset,
        length: action.length
      }
    })
  ),
  on(
    scannerActions.loadHistorySuccess,
    (state, action) => ({
      ...state,
      histories: action.histories,
      load: {
        ...state.load,
        allowToLoad: false,
        total: action.total
      }
    })
  )
);

export function reducer(state: ScannerState | undefined, action: Action) {
  return scannerReducer(state, action);
}

const getScannerFeatureState = createFeatureSelector<ScannerState>('scanner');

export const selectHistories = createSelector(
  getScannerFeatureState,
  (state: ScannerState) => state.histories
);

export const selectLoadInfo = createSelector(
  getScannerFeatureState,
  (state: ScannerState) => state.load
);
