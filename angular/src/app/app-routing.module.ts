import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScanComponent } from '@components/scan/scan.component'

const routes: Routes = [
  {
    path: 'scan',
    component: ScanComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
