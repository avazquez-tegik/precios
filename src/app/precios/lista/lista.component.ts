import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchService } from '../services/search.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { NgxSpinnerService } from 'ngx-spinner';
import { of , Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Articulo } from '../../core/models/articulo';
import { AuthService } from '../../core/services/auth.service';


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

  carritoDoc: AngularFirestoreDocument < any > ;
  destacadosDoc: AngularFirestoreDocument < any > ;

  mi_carrito: any = {};
  destacados: any = {};


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

  constructor(private searcher: SearchService,
    private spinner: NgxSpinnerService,
    private afs: AngularFirestore,
    private authService: AuthService) {

    this.optionCadenasForm = new FormGroup({});

    for (let cat of this.options)
      for (let branch of cat.branches)
        this.optionCadenasForm.addControl(branch.name_control, new FormControl(branch.value));

  }

  ngOnInit() {


    let user = this.authService.getUser().subscribe(user => {
      this.carritoDoc = this.afs.doc('carrito/' + user.id);

      this.carritoDoc.valueChanges().subscribe(carrito => {
        this.mi_carrito = carrito;
      })

      this.destacadosDoc = this.afs.doc('comparacion/destacados');
      this.destacadosDoc.valueChanges().subscribe(destacados => {
        this.destacados = destacados;
      })


    });


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

  public agregarCarrito(articulo: Articulo) {
    let id: string = btoa(articulo.enlace_informacion);

    if (!this.mi_carrito) {
      this.mi_carrito = {};
    }
    this.mi_carrito[id] = articulo;

    this.carritoDoc.set(this.mi_carrito, { merge: true });




  }


  public agregarDestacado(articulo: Articulo) {
    let id: string = btoa(articulo.enlace_informacion);

    if (!this.destacados) {
      this.destacados = {};
    }
    this.destacados[id] = articulo;

    this.destacadosDoc.set(this.destacados, { merge: true });



  }





}
