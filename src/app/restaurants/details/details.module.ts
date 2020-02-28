import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPageRoutingModule } from './details-routing.module';

import { DetailsPage } from './details.page';
import {GoogleMapsComponent} from '../../google-maps/google-maps.component'
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPageRoutingModule,
    AgmCoreModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  declarations: [DetailsPage, GoogleMapsComponent]
})
export class DetailsPageModule {}
