import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeckDetailPage } from './deck-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DeckDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeckDetailPageRoutingModule {}
