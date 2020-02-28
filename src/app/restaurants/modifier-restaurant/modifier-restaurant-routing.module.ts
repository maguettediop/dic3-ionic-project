import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifierRestaurantPage } from './modifier-restaurant.page';

const routes: Routes = [
  {
    path: '',
    component: ModifierRestaurantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifierRestaurantPageRoutingModule {}
