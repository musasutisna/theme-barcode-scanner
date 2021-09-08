import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as scannerActions from '@state/scanner.actions';
import * as scannerReducer from '@state/scanner.reducer';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  public devices$!: Observable<any[]>;
  public device: string;
  public load = {
    allowToLoad: true
  };

  constructor(
    private store: Store
  ) {
    this.device = 'none';
  }

  ngOnInit(): void {
    this.devices$ = this.store.pipe(select(scannerReducer.selectDevices));

    this.store.select(scannerReducer.selectLoadInfo).subscribe(load => {
      this.load = {
        ...load
      };
    });

    // Only load devices once
    if (this.load.allowToLoad) {
      this.store.dispatch(scannerActions.loadDevice());
    }
  }

  saveSetting(): void {
    this.store.dispatch(scannerActions.setSetting({
      device: this.device
    }));
  }
}
