import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridRoutingModule } from './grid-routing.module';
import { GridComponent } from './grid.component';

import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [GridComponent],
  imports: [
    CommonModule,
    GridRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class GridModule { }
