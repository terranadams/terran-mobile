import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MnistPage } from './mnist.page';

const routes: Routes = [
  {
    path: '',
    component: MnistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MnistPageRoutingModule {}
