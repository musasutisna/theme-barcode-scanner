import { createAction, props } from '@ngrx/store';
import { Data } from '@models/data.model';

export enum ScannerTypes {
  LoadDevice = '[Scanner] Load Devices',
  LoadDeviceSuccess = '[Scanner] Load Devices Success',
  LoadDeviceFailed = '[Scanner] Load Devices Failed',
  DataDetected = '[Scanner] Data Detected',
  LoadHistory = '[Scanner] Load History',
  LoadHistorySuccess = '[Scanner] Load History Success',
  LoadHistoryFailed = '[Scanner] Load History Failed',
  SetSetting = '[Scanner] Set Setting',
  SetSettingSuccess = '[Scanner] Set Setting Success',
  SetSettingFailed = '[Scanner] Set Setting Failed'
};

export const loadDevice = createAction(
  ScannerTypes.LoadDevice,
  () => ({
    message: 'Load Available Device'
  })
);

export const loadDeviceSuccess = createAction(
  ScannerTypes.LoadDeviceSuccess,
  props<{ devices: any[] }>()
);

export const loadDeviceFailed = createAction(
  ScannerTypes.LoadDeviceFailed,
  props<{ message: any }>()
);

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

export const loadHistoryFailed = createAction(
  ScannerTypes.LoadHistoryFailed,
  props<{ message: any }>()
);

export const setSetting = createAction(
  ScannerTypes.SetSetting,
  (setting: { device: string }) => ({
    device: setting.device,
    message: 'Save Current Setting'
  })
);

export const setSettingSuccess = createAction(
  ScannerTypes.SetSettingSuccess
);

export const setSettingFailed = createAction(
  ScannerTypes.SetSettingFailed,
  props<{ message: string }>()
);
