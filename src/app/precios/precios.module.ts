import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreciosRoutingModule } from './precios-routing.module';
import { ListaComponent } from './lista/lista.component';
import {ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [ListaComponent],
  imports: [
    CommonModule,
    PreciosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ]
})
export class PreciosModule { }
