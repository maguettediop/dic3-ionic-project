import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ModifierPageRoutingModule } from './modifier-routing.module';

import { ModifierPage } from './modifier.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ModifierPageRoutingModule,
    FormsModule
  ],
  declarations: [ModifierPage]
})
export class ModifierPageModule {}
