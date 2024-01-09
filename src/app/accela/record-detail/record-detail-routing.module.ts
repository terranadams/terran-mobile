import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecordDetailPage } from './record-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RecordDetailPage
  },
  {
    path: ':inspection-detail',
    loadChildren: () => import('./inspection-detail/inspection-detail.module').then( m => m.InspectionDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordDetailPageRoutingModule {}
