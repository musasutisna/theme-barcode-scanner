import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Data } from '@models/data.model';
import * as scannerReducer from '@state/scanner.reducer';
import * as scannerActions from '@state/scanner.actions';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  public histories$!: Observable<Data[]>;
  public load = {
    allowToLoad: true,
    offset: 0,
    length: 10
  };

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.histories$ = this.store.pipe(select(scannerReducer.selectHistories));

    this.store.select(scannerReducer.selectLoadInfo).subscribe(load => {
      this.load = {
        ...load
      };
    });

    // Only load histories once
    if (this.load.allowToLoad) {
      this.store.dispatch(scannerActions.loadHistory(this.load.offset, this.load.length));
    }
  }
}
