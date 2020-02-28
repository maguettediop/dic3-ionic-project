import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartePageRoutingModule } from './carte-routing.module';
import {GoogleMapsComponent} from '../google-maps/google-maps.component'
import { CartePage } from './carte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartePageRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  declarations: [CartePage, GoogleMapsComponent]
})
export class CartePageModule {}
