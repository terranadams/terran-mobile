import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CaughtDetailPageRoutingModule } from './caught-detail-routing.module';

import { CaughtDetailPage } from './caught-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CaughtDetailPageRoutingModule
  ],
  declarations: [CaughtDetailPage]
})
export class CaughtDetailPageModule {}
