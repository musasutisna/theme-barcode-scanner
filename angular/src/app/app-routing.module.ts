import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScanComponent } from '@components/scan/scan.component'
import { HistoryComponent } from '@components/history/history.component';
import { SettingComponent } from '@components/setting/setting.component';

const routes: Routes = [
  {
    path: 'scan',
    component: ScanComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  },
  {
    path: 'setting',
    component: SettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
