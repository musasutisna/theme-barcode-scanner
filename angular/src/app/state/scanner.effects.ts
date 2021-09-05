import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { Data } from '@models/data.model';
import { HistoryService } from '@services/history.service';
import * as exceptionActions from '@state/exception.actions';
import * as scannerActions from '@state/scanner.actions';

@Injectable()
export class ScannerEffects {
  public processStart$ = createEffect(() => this.action$.pipe(
    ofType(
      scannerActions.loadHistory
    ),
    tap((action: any) => {
      this.store.dispatch(exceptionActions.openLoading({ message: action.message }));
    })
  ), {
    dispatch: false
  });

  public processDone$ = createEffect(() => this.action$.pipe(
    ofType(
      scannerActions.loadHistorySuccess,
      scannerActions.LoadHistoryFailed
    ),
    tap(() => {
      this.store.dispatch(exceptionActions.closeLoading());
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

  constructor(
    private action$: Actions,
    private store: Store,
    private historyService: HistoryService
  ) { }
}
