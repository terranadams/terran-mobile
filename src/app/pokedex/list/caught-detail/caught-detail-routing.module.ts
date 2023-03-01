import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaughtDetailPage } from './caught-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CaughtDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaughtDetailPageRoutingModule {}
