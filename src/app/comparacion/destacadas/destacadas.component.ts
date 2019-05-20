import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Articulo } from '../../core/models/articulo';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-destacadas',
  templateUrl: './destacadas.component.html',
  styleUrls: ['./destacadas.component.scss']
})
export class DestacadasComponent implements OnInit {

  destacadosCol: AngularFirestoreCollection < any > ;
  public destacados: any[]=[];

  public p;
  public text: string;
  filterPost = '';
  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.destacadosCol = this.afs.collection('comparacion');


    this.destacadosCol.valueChanges().subscribe(res => {
      this.destacados= res;
    })
  }

  find() {

  }

}
