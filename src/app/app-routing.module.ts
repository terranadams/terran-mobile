import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'pokedex',
    loadChildren: () => import('./pokedex/pokedex.module').then( m => m.PokedexPageModule)
  },
  {
    path: 'mnist',
    loadChildren: () => import('./mnist/mnist.module').then( m => m.MnistPageModule)
  },
  {
    path: 'watchgenerator',
    loadChildren: () => import('./watchgenerator/watchgenerator.module').then( m => m.WatchgeneratorPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
