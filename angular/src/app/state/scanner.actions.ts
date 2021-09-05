import { createAction, props } from '@ngrx/store';
import { Data } from '@models/data.model';

export enum ScannerTypes {
  DataDetected = '[Scanner] Data Detected',
  LoadHistory = '[Scanner] Load History',
  LoadHistorySuccess = '[Scanner] Load History Success',
  LoadHistoryFailed = '[Scanner] Load History Failed'
};

export const dataDetected = createAction(
  ScannerTypes.DataDetected,
  props<{ data: Data }>()
);

export const loadHistory = createAction(
  ScannerTypes.LoadHistory,
  (offset: number, length: number) => ({
    offset: offset,
    length: length,
    message: 'Load List Barcode'
  })
);

export const loadHistorySuccess = createAction(
  ScannerTypes.LoadHistorySuccess,
  props<{ histories: Data[], total: 0 }>()
);

export const LoadHistoryFailed = createAction(
  ScannerTypes.LoadHistoryFailed,
  props<{ message: any }>()
);
