import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeckDetailPageRoutingModule } from './deck-detail-routing.module';

import { DeckDetailPage } from './deck-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeckDetailPageRoutingModule
  ],
  declarations: [DeckDetailPage]
})
export class DeckDetailPageModule {}
