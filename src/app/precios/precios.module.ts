import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreciosRoutingModule } from './precios-routing.module';
import { ListaComponent } from './lista/lista.component';
import {ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AccordionModule as MkAccordionModule, BoxModule } from 'angular-admin-lte';

@NgModule({
  declarations: [ListaComponent],
  imports: [
    CommonModule,
    PreciosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    ScrollingModule,
    MkAccordionModule,
    BoxModule
  ]
})
export class PreciosModule { }
