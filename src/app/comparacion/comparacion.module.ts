import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComparacionRoutingModule } from './comparacion-routing.module';
import { DestacadasComponent } from './destacadas/destacadas.component';

@NgModule({
  declarations: [DestacadasComponent],
  imports: [
    CommonModule,
    ComparacionRoutingModule
  ]
})
export class ComparacionModule { }
