import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeckDetailPageRoutingModule } from './deck-detail-routing.module';

import { DeckDetailPage } from './deck-detail.page';
import { ThemeToggleModule } from 'src/app/shared/theme-toggle.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeckDetailPageRoutingModule,
    ThemeToggleModule
],
  declarations: [DeckDetailPage]
})
export class DeckDetailPageModule {}
