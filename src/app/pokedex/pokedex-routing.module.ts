import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokedexPage } from './pokedex.page';

const routes: Routes = [
  {
    path: '',
    component: PokedexPage,
    children: [
      {
        path: 'list',
        loadChildren: () =>
          import('./list/list.module').then((m) => m.ListPageModule),
      },
      {
        path: 'discover',
        loadChildren: () =>
          import('./discover/discover.module').then((m) => m.DiscoverPageModule),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokedexPageRoutingModule {}
