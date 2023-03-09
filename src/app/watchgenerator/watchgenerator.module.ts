import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WatchgeneratorPageRoutingModule } from './watchgenerator-routing.module';

import { WatchgeneratorPage } from './watchgenerator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WatchgeneratorPageRoutingModule
  ],
  declarations: [WatchgeneratorPage]
})
export class WatchgeneratorPageModule {}
