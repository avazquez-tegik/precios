import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchService } from '../services/search.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
  providers: [SearchService]
})
export class ListaComponent implements OnInit {

  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;


  public text: string;
  public list: any[] = [];
  public filtro = 'cadena';
  public tienda = '';
  public p;
  public show: boolean;

  public optionCadenasForm: FormGroup;
  personas: any[];
  filterPost = '';
  filterPriceMin = 0;
  filterPriceMax = 500000;

  constructor(private searcher: SearchService, private spinner: NgxSpinnerService) {
    this.optionCadenasForm = new FormGroup({
      soriana: new FormControl(true),
      heb: new FormControl(false),
      liverpool: new FormControl(false),
      sears: new FormControl(false),
      sanborns: new FormControl(false),
      bestbuy: new FormControl(false),
      farmacias_del_ahorro: new FormControl(false),
      walmart: new FormControl(false),
      home_depot: new FormControl(false),
      pcel: new FormControl(false),
      costco: new FormControl(false),
      super_walmart: new FormControl(false),

      superama: new FormControl(false),
      bodega_aurrera: new FormControl(false),

      delsol: new FormControl(false),
      officedepot: new FormControl(false),
      officemax: new FormControl(false)
    });

  }

  ngOnInit() {



  }

  public find() {
    this.list = [];
    this.spinner.show();
    this.list = [];
    this.filterPost = '';

    for (const attr in this.optionCadenasForm.value) {
      if (this.optionCadenasForm.value[attr]) {
        this.getList(attr);
      }
    }

  }


  public getList(cadena: string) {
    this.searcher.search(cadena, this.text, 1).subscribe(data => {

      if (data.results) {
        for (const r of data.results) {
          this.list.push(r);
        }

        this.list = this.order(this.list);
        this.spinner.hide();
        this.personas = this.order(this.list);
        this.show = true;
      }


    });
  }


  order(array: Array < any > ): Array < any > {

    if (!array || array === undefined || array.length === 0) { return []; }

    array.sort((a: any, b: any) => {
      if (Number(a.precio) < Number(b.precio)) {
        return -1;
      } else if (Number(a.precio) > Number(b.precio)) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;

  }





}
