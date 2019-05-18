import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchService } from '../services/search.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { NgxSpinnerService } from 'ngx-spinner';
import { of , Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

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

  public items$: Observable < any[] > ;

  public optionCadenasForm: FormGroup;
  personas: any[];
  filterPost = '';
  filterPriceMin = 0;
  filterPriceMax = 500000;


  options: any[] = [{
      category: 'Departamentales',
      branches: [{
        name_control: 'soriana',
        title: 'Soriana',
        value: true
      }, {
        name_control: 'liverpool',
        title: 'Liverpool',
        value: false
      }, {
        name_control: 'sears',
        title: 'Sears',
        value: false
      }, {
        name_control: 'sanborns',
        title: 'Sanborns',
        value: false
      }, {
        name_control: 'costco',
        title: 'Costco',
        value: false
      }, {
        name_control: 'walmart',
        title: 'WalMart',
        value: false
      }, {
        name_control: 'delsol',
        title: 'DelSol',
        value: false
      }, {
        name_control: 'palacio_hierro',
        title: 'Palacio Hierro',
        value: false
      }]
    },
    {
      category: 'SuperMercados',
      branches: [{
          name_control: 'heb',
          title: 'HEB',
          value: false
        },
        {
          name_control: 'super_walmart',
          title: 'WalMart',
          value: false
        },
        {
          name_control: 'bodega_aurrera',
          title: 'Bodega Aurrera',
          value: false
        }, {
          name_control: 'superama',
          title: 'Superama',
          value: false
        }, {
          name_control: 'chedraui',
          title: 'Chedraui',
          value: false
        }
      ]
    },
    {
      category: 'Deporte',
      branches: [{
        name_control: 'innova_sport',
        title: 'Innova Sport',
        value: false
      }, {
        name_control: 'marti',
        title: 'Marti',
        value: false
      }]
    }, {
      category: 'Electronica',
      branches: [{
        name_control: 'bestbuy',
        title: 'BestBuy',
        value: false
      }, {
        name_control: 'pcel',
        title: 'Pcel',
        value: false
      }]
    },
    {
      category: 'Farmacias',
      branches: [{
        name_control: 'farmacias_del_ahorro',
        title: 'Farmacias del Ahorro',
        value: false
      }]
    },
    {
      category: 'Hogar',
      branches: [{
        name_control: 'home_depot',
        title: 'Home Depot',
        value: false
      }]
    }, {
      category: 'Oficina',
      branches: [{
        name_control: 'officedepot',
        title: 'Office Depot',
        value: false
      }, {
        name_control: 'officemax',
        title: 'Office Max',
        value: false
      }]
    }


  ]

  constructor(private searcher: SearchService, private spinner: NgxSpinnerService) {

    this.optionCadenasForm = new FormGroup({});

    for (let cat of this.options)
      for (let branch of cat.branches)
        this.optionCadenasForm.addControl(branch.name_control, new FormControl(branch.value));


    /* this.optionCadenasForm = new FormGroup({
      
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
       officemax: new FormControl(false),
       palacio_hierro: new FormControl(false),
       innova_sport: new FormControl(false),
       chedraui: new FormControl(false),
       marti: new FormControl(false)

     });*/

  }

  ngOnInit() {



  }


  public getOptionsSelect(): Observable < string > {
    return new Observable(observer => {

      for (let attr in this.optionCadenasForm.value)
        if (this.optionCadenasForm.value[attr])
          observer.next(attr);

      observer.complete();
    });
  }

  public find() {
    this.spinner.show();
    this.filterPost = '';

    let options: string[] = [];
    let listCadenas$ = this.getOptionsSelect();
    let search = listCadenas$.pipe(mergeMap(value =>
      this.searcher.search(value, this.text, 1)
    ));

    this.items$ = new Observable(observer => {

      let items: any[] = [];
      observer.next(items);

      search.subscribe(res => {

        this.spinner.hide();
        items = items.concat(res.results)
        this.show = true;
        items = this.order(items);
        observer.next(items);

      });

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
