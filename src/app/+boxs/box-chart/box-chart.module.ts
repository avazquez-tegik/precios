import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxChartRoutingModule } from './box-chart-routing.module';
import { BoxChartComponent } from './box-chart.component';

@NgModule({
  declarations: [BoxChartComponent],
  imports: [
    CommonModule,
    BoxChartRoutingModule
  ]
})
export class BoxChartModule { }
