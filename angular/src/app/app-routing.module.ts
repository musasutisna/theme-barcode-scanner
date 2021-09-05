import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScanComponent } from '@components/scan/scan.component'
import { HistoryComponent } from '@components/history/history.component';

const routes: Routes = [
  {
    path: 'scan',
    component: ScanComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
