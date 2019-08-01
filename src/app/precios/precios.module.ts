import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreciosRoutingModule } from './precios-routing.module';
import { ListaComponent } from './lista/lista.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AccordionModule as MkAccordionModule, BoxModule } from 'angular-admin-lte';
import { FiltrosPipe } from './pipes/filtros.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthService } from '../core/services/auth.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import {TabViewModule} from 'primeng/tabview';
import {TabMenuModule} from 'primeng/tabmenu';
import {ButtonModule} from 'primeng/button';




@NgModule({
  declarations: [ListaComponent, FiltrosPipe],
  imports: [
    CommonModule,
    PreciosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    ScrollingModule,
    MkAccordionModule,
    BoxModule,
    NgxPaginationModule,
    NgxSpinnerModule, ModalModule.forRoot(),
    TabViewModule,
    TabMenuModule,
    ButtonModule


  ],
  providers: [AuthService]
})
export class PreciosModule {}
