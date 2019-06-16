import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { SearchService } from '../services/search.service';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { NgxSpinnerService } from 'ngx-spinner';
import { of , Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
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




  public destacadoForm: FormGroup = new FormGroup({
    etiqueta: new FormControl(),
    articulos: new FormArray([])
  });


  public items$: Observable < any[] > ;

  public optionCadenasForm: FormGroup;

  filterPost = '';
  filterPriceMin = 0;
  filterPriceMax = 500000;

  carritoDoc: AngularFirestoreDocument < any > ;
  destacadosDoc: AngularFirestoreDocument < any > ;

  busqueda$: Observable < any[] > ;

  mi_carrito: any = {};
  destacados: any = {};

  articulos: Articulo[] = [];
  user: any;


  options: any[] = cadenas;

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

    this.show= false;




    let user = this.authService.getUser().subscribe(user => {
      this.carritoDoc = this.afs.doc('carrito/' + user.id);
      this.user = user;

      this.nuevoBusqueda();

      this.carritoDoc.valueChanges().subscribe(carrito => {
        this.mi_carrito = carrito;
      })


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

    //Muestra el spinner
    this.spinner.show();
    this.filterPost = '';
    let options: string[] = [];

    //Obtiene todos las tiendas que esta selecionada como true
    let listCadenas$ = this.getOptionsSelect();

    //Inicializa o Crea un observador que ejecutara un monton de solicitudes 
    //Se enviara un monton de solicitudes sin espera de respuesta a los lambdas
    //El backend insertara en firebase 

    let search = listCadenas$.pipe(mergeMap(value =>
      this.searcher.search(value, this.text, 1, this.user.id)
    ));

    //Borra todo el contenido para 
    let borrado = await this.searcher.borrar(this.user.id).toPromise();

    //Empieza a escuchar en firebase para ver cuales sera los valores que se insertara con el lambda
    this.busqueda$ = this.afs.collection('busqueda/' + this.user.id + "/resultados").valueChanges();

    //Envia todas la solicitudes al mismo tiempo
    search.subscribe(res => {

    });


    //Escucha los cambios en firebase y cuando ya tenga la primer registro, ocultara el spinner
    this.busqueda$.subscribe(resultado => {
      if (resultado.length > 0) {
        this.spinner.hide();
        this.show=true;
      }

    });

    //Obtiene todos los filtros selecionado como true
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
      search: this.filterPost,
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

    this.searcher.borrar(this.user.id).subscribe(item => {

    });


  }


  public ngOnDestroy() {
    this.nuevoBusqueda();
  }

}
