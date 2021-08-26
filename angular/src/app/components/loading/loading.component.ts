import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as exceptionReducer from '@state/exception.reducer';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  public loading = {
    state: false,
    message: ''
  };

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.select(exceptionReducer.selectLoading).subscribe((loading: any) => {
      this.loading = {
        ...loading
      };
    });
  }

}
