import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserInterface } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private afs: AngularFirestore) {}


  public update(user: UserInterface) {
    const userRef: AngularFirestoreDocument < any > = this.afs.doc('users/' + user.id);
    userRef.set(user, { merge: true })
  }
}
