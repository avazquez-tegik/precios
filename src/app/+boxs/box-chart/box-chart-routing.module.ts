import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoxChartComponent } from './box-chart.component';
const routes: Routes = [
  { path: '',
    component: BoxChartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoxChartRoutingModule { }
