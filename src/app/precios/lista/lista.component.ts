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
  public cadenas: string[] = [];
  public filtro: string = 'cadena';
  public buscando: boolean = false;
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

    })

  }

  ngOnInit() {

  }

  public find() {

    this.buscando = true;
    this.cadenas = [];

    for (let attr in this.optionCadenasForm.value) {
      if (this.optionCadenasForm.value[attr]) {
        this.cadenas.push(attr);

      }
    }

    this.list = [];

    this.getList(0);


  }


  public getList(index: number) {
    this.searcher.search(this.cadenas[index], this.text, 1).subscribe(data => {
      console.log(data);

      this.tienda = this.cadenas[index];


      if (data.results) {

        for (let r of data.results) {
          this.list.push(r);
        }

        this.list = this.order(this.list);
        index = index + 1;

        if (index < this.cadenas.length) {
          this.getList(index++);
        } else {
          this.buscando = false;
          return;
        }
      }


    });
  }


  order(array: Array < any > ): Array < any > {

    if (!array || array === undefined || array.length === 0) return null;

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
