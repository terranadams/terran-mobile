import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccelaPage } from './accela.page';

const routes: Routes = [
  {
    path: '',
    component: AccelaPage
  },
  {
    path: 'record-detail',
    loadChildren: () => import('./record-detail/record-detail.module').then( m => m.RecordDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccelaPageRoutingModule {}
