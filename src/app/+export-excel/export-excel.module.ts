import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { ExportExcelRoutingModule } from './export-excel-routing.module';
import { ExportExcelComponent } from './export-excel.component';

@NgModule({
  declarations: [ExportExcelComponent],
  imports: [
    CommonModule,
    ExportExcelRoutingModule,
    ExcelExportModule
  ]
})
export class ExportExcelModule { }
