import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as scannerActions from '@state/scanner.actions';

@Injectable()
export class ScannerEffects {
  public dataDetected$ = createEffect(() => this.action$.pipe(
    ofType(
      scannerActions.dataDetected
    ),
    tap((action: any) => {
      let currentHistory: any = window.localStorage.getItem('history');

      if (currentHistory === null) {
        currentHistory = {
          'history': []
        };
      } else {
        currentHistory = JSON.parse(currentHistory);
      }

      currentHistory.history.push({
        'symbol': action.symbol,
        'data': action.data
      });

      window.localStorage.setItem('history', JSON.stringify(currentHistory));
    })
  ), {
    dispatch: false
  });

  constructor(
    private action$: Actions
  ) { }
}
