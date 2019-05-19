import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DestacadasComponent } from './destacadas/destacadas.component';

const routes: Routes = [{
	path: 'destacadas',
	component: DestacadasComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComparacionRoutingModule { }
