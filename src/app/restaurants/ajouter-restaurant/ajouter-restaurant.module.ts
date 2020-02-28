import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjouterRestaurantPageRoutingModule } from './ajouter-restaurant-routing.module';

import { AjouterRestaurantPage } from './ajouter-restaurant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjouterRestaurantPageRoutingModule
  ],
  declarations: [AjouterRestaurantPage]
})
export class AjouterRestaurantPageModule {}
