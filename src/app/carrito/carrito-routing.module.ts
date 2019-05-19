import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MiCarritoComponent } from './mi-carrito/mi-carrito.component';

const routes: Routes = [{
	path: 'mi-carrito', 
	component: MiCarritoComponent

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarritoRoutingModule { }
