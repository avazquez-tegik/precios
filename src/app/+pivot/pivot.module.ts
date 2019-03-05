import { NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PivotRoutingModule } from './pivot-routing.module';
import { PivotComponent } from './pivot.component';
import { WebDataRocksPivot } from '../webdatarocks/webdatarocks.angular4';

@NgModule({
  imports: [
    CommonModule,
    PivotRoutingModule
  ],
  declarations: [PivotComponent, WebDataRocksPivot]
})
export class PivotModule {
  @ViewChild('pivot1') child: WebDataRocksPivot;
}
