import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarritoRoutingModule } from './carrito-routing.module';
import { MiCarritoComponent } from './mi-carrito/mi-carrito.component';

@NgModule({
  declarations: [MiCarritoComponent],
  imports: [
    CommonModule,
    CarritoRoutingModule
  ]
})
export class CarritoModule { }
