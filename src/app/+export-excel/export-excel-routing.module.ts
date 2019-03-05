import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExportExcelComponent } from './export-excel.component';
import { AuthGuard } from '../core/guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: ExportExcelComponent,
    canActivate: [AuthGuard]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExportExcelRoutingModule { }

