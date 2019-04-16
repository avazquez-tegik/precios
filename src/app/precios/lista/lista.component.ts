import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
  providers: [SearchService]
})
export class ListaComponent implements OnInit {

  public text: string;
  public list: any[] = [];
  public filtro: string = 'cadena';
  public tienda: string = '';

  public optionCadenasForm: FormGroup;


  constructor(private searcher: SearchService) {
    this.optionCadenasForm = new FormGroup({
      soriana: new FormControl(true),
      heb: new FormControl(true),
      liverpool: new FormControl(true),
      sears: new FormControl(true),
      sanborns: new FormControl(true),
      bestbuy: new FormControl(true),
      farmacias_del_ahorro: new FormControl(true),
      walmart: new FormControl(true),
      home_depot: new FormControl(true),
      pcel: new FormControl(true)
    });

  }

  ngOnInit() {

  }

  public find() {

    this.list = [];
    for (let attr in this.optionCadenasForm.value) {
      if (this.optionCadenasForm.value[attr]) {
        this.getList(attr);
      }
    }


  }


  public getList(cadena: string) {
    this.searcher.search(cadena, this.text, 1).subscribe(data => {

      if (data.results) {
        for (let r of data.results) {
          this.list.push(r);
        }

        this.list = this.order(this.list);

      }


    });
  }


  order(array: Array < any > ): Array < any > {

    if (!array || array === undefined || array.length === 0) return [];

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
