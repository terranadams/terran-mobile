import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { AccelaPageRoutingModule } from './accela-routing.module';

import { AccelaPage } from './accela.page';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccelaPageRoutingModule
  ],
  declarations: [AccelaPage, SignInFormComponent],
})
export class AccelaPageModule {}
