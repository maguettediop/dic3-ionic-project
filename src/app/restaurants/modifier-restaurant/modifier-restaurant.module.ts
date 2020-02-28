import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifierRestaurantPageRoutingModule } from './modifier-restaurant-routing.module';

import { ModifierRestaurantPage } from './modifier-restaurant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifierRestaurantPageRoutingModule
  ],
  declarations: [ModifierRestaurantPage]
})
export class ModifierRestaurantPageModule {}
