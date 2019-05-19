import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Articulo } from '../../core/models/articulo';

@Component({
  selector: 'app-destacadas',
  templateUrl: './destacadas.component.html',
  styleUrls: ['./destacadas.component.scss']
})
export class DestacadasComponent implements OnInit {

  destacadosDoc: AngularFirestoreDocument < any > ;
  public destacados: Articulo[] = [];

  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.destacadosDoc = this.afs.doc('comparacion/destacados');

    this.destacadosDoc.valueChanges().subscribe(destacados => {
      for (let attr in destacados) {
        this.destacados.push(destacados[attr]);
      }
    });
  }

}
