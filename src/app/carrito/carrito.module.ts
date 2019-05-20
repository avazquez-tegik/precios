import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoRoutingModule } from './carrito-routing.module';
import { MiCarritoComponent } from './mi-carrito/mi-carrito.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AccordionModule as MkAccordionModule, BoxModule } from 'angular-admin-lte';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthService } from '../core/services/auth.service';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [MiCarritoComponent, SearchPipe],
  imports: [
    CommonModule,
    CarritoRoutingModule,
    FormsModule,
    HttpModule,
    ScrollingModule,
    MkAccordionModule,
    BoxModule,
    NgxPaginationModule,
    NgxSpinnerModule
  ]
})
export class CarritoModule {}
