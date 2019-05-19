import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from '../../core/services/auth.service';
import { Articulo } from '../../core/models/articulo';

@Component({
  selector: 'app-mi-carrito',
  templateUrl: './mi-carrito.component.html',
  styleUrls: ['./mi-carrito.component.scss']
})
export class MiCarritoComponent implements OnInit {
  carritoDoc: AngularFirestoreDocument < any > ;

  public mi_carrito: Articulo[] = [];


  constructor(private authService: AuthService,
    private afs: AngularFirestore) {}

  ngOnInit() {
    let user = this.authService.getUser().subscribe(user => {

      this.carritoDoc = this.afs.doc('carrito/' + user.id);

      this.carritoDoc.valueChanges().subscribe(carrito => {
        for (let attr  in carrito) {
          this.mi_carrito.push(carrito[attr]);
        }
      })

    });
  }

}
