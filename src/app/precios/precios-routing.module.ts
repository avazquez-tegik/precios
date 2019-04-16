import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [{
  path : 'lista',
  component: ListaComponent,
  data: {
    title: 'Lista',
    canActivate: [AuthGuard]
  }

}];

@NgModule({
  imports: [RouterModule.forChild(routes), ],
  exports: [RouterModule]
})
export class PreciosRoutingModule { }
