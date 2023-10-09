import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccelaPage } from './accela.page';

const routes: Routes = [
  {
    path: '',
    component: AccelaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccelaPageRoutingModule {}
