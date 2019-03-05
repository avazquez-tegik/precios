import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { PivotComponent } from './pivot.component';

const routes: Routes = [{
  path: '',
  component: PivotComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PivotRoutingModule { }
