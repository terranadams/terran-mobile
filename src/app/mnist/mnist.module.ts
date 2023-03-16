import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MnistPageRoutingModule } from './mnist-routing.module';

import { MnistPage } from './mnist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MnistPageRoutingModule
  ],
  declarations: [MnistPage]
})
export class MnistPageModule {}
