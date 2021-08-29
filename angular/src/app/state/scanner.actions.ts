import { createAction, props } from '@ngrx/store';
import { Data } from '@models/data.model';

export enum ScannerTypes {
  DataDetected = '[Scanner] Data Detected'
};

export const dataDetected = createAction(
  ScannerTypes.DataDetected,
  props<{ data: Data }>()
);
