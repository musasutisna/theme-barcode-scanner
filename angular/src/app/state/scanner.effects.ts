import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { CameraService } from '@services/camera.service';
import { HistoryService } from '@services/history.service';
import { SettingService } from '@services/setting.service';
import * as exceptionActions from '@state/exception.actions';
import * as scannerActions from '@state/scanner.actions';

@Injectable()
export class ScannerEffects {
  public processStart$ = createEffect(() => this.action$.pipe(
    ofType(
      scannerActions.loadDevice,
      scannerActions.loadHistory,
      scannerActions.setSetting
    ),
    tap((action: any) => {
      this.store.dispatch(exceptionActions.openLoading({ message: action.message }));
    })
  ), {
    dispatch: false
  });

  public processDone$ = createEffect(() => this.action$.pipe(
    ofType(
      scannerActions.loadDeviceSuccess,
      scannerActions.loadDeviceFailed,
      scannerActions.loadHistorySuccess,
      scannerActions.loadHistoryFailed,
      scannerActions.setSettingSuccess,
      scannerActions.setSettingFailed
    ),
    tap(() => {
      this.store.dispatch(exceptionActions.closeLoading());
    })
  ), {
    dispatch: false
  });

  public loadDevice$ = createEffect(() => this.action$.pipe(
    ofType(
      scannerActions.loadDevice
    ),
    tap(async (action: any) => {
      const devices: any = await this.cameraService.getVideoDevices();

      if (devices === false) {
        this.store.dispatch(scannerActions.loadDeviceFailed({ message: 'No devices available' }));
      } else {
        this.store.dispatch(scannerActions.loadDeviceSuccess({ devices }));
      }
    })
  ), {
    dispatch: false
  });

  public dataDetected$ = createEffect(() => this.action$.pipe(
    ofType(
      scannerActions.dataDetected
    ),
    tap((action: any) => {
      this.historyService.addNewData(action.data);
    })
  ), {
    dispatch: false
  });

  public loadHistory$ = createEffect(() => this.action$.pipe(
    ofType(
      scannerActions.loadHistory
    ),
    tap((action: any) => {
      let histories = this.historyService.loadCurrentHistory(action.offset, action.length);

      this.store.dispatch(scannerActions.loadHistorySuccess(histories));
    })
  ), {
    dispatch: false
  });

  public setSetting$ = createEffect(() => this.action$.pipe(
    ofType(
      scannerActions.setSetting
    ),
    tap((action: any) => {
      this.settingService.setCurrentDevice(action.device);
      this.store.dispatch(scannerActions.setSettingSuccess());
    })
  ), {
    dispatch: false
  });

  constructor(
    private action$: Actions,
    private store: Store,
    private cameraService: CameraService,
    private historyService: HistoryService,
    private settingService: SettingService
  ) { }
}
