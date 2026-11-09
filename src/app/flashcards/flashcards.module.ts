import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlashcardsPageRoutingModule } from './flashcards-routing.module';

import { FlashcardsPage } from './flashcards.page';
import { ThemeToggleModule } from '../shared/theme-toggle.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlashcardsPageRoutingModule,
    ThemeToggleModule
],
  declarations: [FlashcardsPage]
})
export class FlashcardsPageModule {}
