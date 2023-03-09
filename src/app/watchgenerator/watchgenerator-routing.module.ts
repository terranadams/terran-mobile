import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WatchgeneratorPage } from './watchgenerator.page';

const routes: Routes = [
  {
    path: '',
    component: WatchgeneratorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchgeneratorPageRoutingModule {}
