import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { SearchService } from '../services/search.service';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { NgxSpinnerService } from 'ngx-spinner';
import { of , Observable, fromEvent } from 'rxjs';
import { mergeMap, map, filter } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Articulo } from '../../core/models/articulo';
import { AuthService } from '../../core/services/auth.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FiltrosPipe } from '../pipes/filtros.pipe';
import { cadenas } from '../data/cadenas';



@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
  providers: [SearchService, FiltrosPipe]
})
export class ListaComponent implements OnInit, OnDestroy {



  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  modalRef: BsModalRef;


  public text: string;
  public list: any[] = [];
  public filtro = 'cadena';
  public tienda = '';
  public p;
  public show: boolean;
  public tiendas: any;
  public filtroTiendas: any[];
  public nb = false;

  public filtroTiendas2: any[];


  public destacadoForm: FormGroup = new FormGroup({
    etiqueta: new FormControl(),
    articulos: new FormArray([])
  });

  public contieneForm: FormGroup = new FormGroup({
    term: new FormControl(),
  });


  public items$: Observable < any[] > ;

  public optionCadenasForm: FormGroup;

  filterPriceMin = 100;
  filterPriceMax = 500000;
  carritoDoc: AngularFirestoreDocument < any > ;
  destacadosDoc: AngularFirestoreDocument < any > ;
  busqueda: any[];
  mi_carrito: any = {};
  destacados: any = {};
  articulos: Articulo[] = [];
  user: any;
  options: any[] = cadenas;
  bandera = false;
  tiendasCompletas: any[];


  constructor(private searcher: SearchService,
    private spinner: NgxSpinnerService,
    private afs: AngularFirestore,
    private authService: AuthService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private fp: FiltrosPipe) {

    this.optionCadenasForm = new FormGroup({});

    for (let cat of this.options) {
      for (let branch of cat.branches) {
        this.optionCadenasForm.addControl(branch.name_control, new FormControl(branch.value));
      }
    }

  }


  ngOnInit() {





    this.show = false;
    let user = this.authService.getUser().subscribe(user => {
      this.carritoDoc = this.afs.doc('carrito/' + user.id);
      this.user = user;

      this.nuevoBusqueda();

      this.carritoDoc.valueChanges().subscribe(carrito => {
        this.mi_carrito = carrito;
      });


   /*   const changeContiene$ = this.contieneForm.get('term').valueChanges;

      //Cuando ocurre un cambio en contiene, se vuelve a filtrar
      changeContiene$.subscribe(value => {
        this.busqueda = this.fp.transform(this.busqueda, {
          search0: this.text,
          search: value,
          min: this.filterPriceMin,
          max: this.filterPriceMax,
          tiendas: this.optionCadenasForm.value
        });
      });*/




    });


  }


  public getOptionsSelect(): Observable < string > {
    return new Observable(observer => {

      for (let attr in this.optionCadenasForm.value) {
        if (this.optionCadenasForm.value[attr]) {
          observer.next(attr);
        }
      }

      observer.complete();
    });
  }




  public async find() {
    this.filtroTiendas2 = [];

    this.tiendasCompletas = [];





    // Muestra el spinner
    this.spinner.show();
    this.bandera = false;
   // Colocar el valor por defecto en el contiene
    this.contieneForm.patchValue({
      term: this.text
    });

    let options: string[] = [];

    // Obtiene todos las tiendas que esta selecionada como true
    let listCadenas$ = this.getOptionsSelect();

    // Inicializa o Crea un observador que ejecutara un monton de solicitudes
    // Se enviara un monton de solicitudes sin espera de respuesta a los lambdas
    // El backend insertara en firebase

    let search$ = listCadenas$.pipe(mergeMap(value =>
      this.searcher.search(value, this.text, 1, this.user.id)
    ));

    // Borra todo el contenido para
    let borrado = await this.searcher.borrar(this.user.id).toPromise();

    // Empieza a escuchar en firebase para ver cuales sera los valores que se insertara con el lambda
    const busqueda$ = this.afs.collection('busqueda/' + this.user.id + '/resultados', ref => ref.orderBy('created_at'))
      .valueChanges();

    // Envia todas la solicitudes al mismo tiempo
    let enviarRequest = await search$.toPromise();


    // Escucha los cambios en firebase y cuando ya tenga la primer registro, ocultara el spinner
    busqueda$.subscribe(items => {
      this.busqueda = items;
      this.tiendasCompletas = [];
    // console.log(this.getTiendasIncluidas());
    // console.log(items);
      if (items.length > 0 ) {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();

        }, 1500);
        this.show = true;
      } else {
        this.show = false;
      }

    if(this.bandera === false) {
    this.tiendasCompletas = this.getTiendasIncluidas();
      for (let j = 0; j < this.busqueda.length; j++) {
        if (this.busqueda[j].end === true) {
            if(!(this.filtroTiendas2.includes(this.busqueda[j].cadena))) {

                        this.filtroTiendas2.push(this.busqueda[j].cadena);
                        for (let i = 0; i < this.tiendasCompletas.length; i++) {
                          if( this.tiendasCompletas[i].nombreServ === this.busqueda[j].cadena) {
                            this.tiendasCompletas[i]['termino'] = true;
                          }
                        }


               }
            }
          }
        }

    });


    // Obtiene todos los filtros selecionado como true
    this.filtroTiendas = this.getTiendasIncluidas();

  }

  get articulosForm(): FormArray {
    return this.destacadoForm.get('articulos') as FormArray;
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

  public compatir(template: TemplateRef < any > ) {
    this.modalRef = this.modalService.show(template);

    let arts = this.fp.transform(this.articulos, {
      search: this.contieneForm.value.term,
      min: this.filterPriceMin,
      max: this.filterPriceMax
    });

    this.destacadoForm.setControl('articulos', new FormArray([]));


    for (let articulo of arts) {
      delete articulo['palabras_claves'];
      articulo['selected'] = false;
      this.articulosForm.push(this.fb.group(articulo));
    }

  }

  public guardarDestacado() {

    let etiqueta: string = this.destacadoForm.value.etiqueta;
    etiqueta = etiqueta.replace(" ", "_");
    etiqueta = etiqueta.toLowerCase();
    this.destacadosDoc = this.afs.doc('comparacion/' + etiqueta);


    let destacado = this.destacadoForm.value;


    let arts: any[] = destacado.articulos.filter(art => {
      return art['selected']
    });


    destacado.articulos = arts;
    this.destacadosDoc.set(destacado, { merge: true });
    this.modalRef.hide();

  }

  public getTiendasIncluidas() {
    let tiendasIncluidas: any[] = [];
    for (let cat of this.options) {
      for (let branch of cat.branches) {
        for (let atributo in this.optionCadenasForm.value) {
          if (this.optionCadenasForm.value[atributo]) {
            if (branch.name_control === atributo) {
              tiendasIncluidas.push(branch);
            }
          }
        }
      }
    }
    return tiendasIncluidas;
  }






  public nuevoBusqueda() {
    this.show = false;
    this.searcher.borrar(this.user.id).subscribe(item => {});
    this.filtroTiendas2 = [];
    this.busqueda = [];
    this.bandera = true;
    for (let i = 0; i < this.tiendasCompletas.length; i++) {
        this.tiendasCompletas[i]['termino'] = false;


    }
  }


  public ngOnDestroy() {
    this.nuevoBusqueda();
  }

  public resetCadenasForm() {
    this.optionCadenasForm.reset();
  }

}

