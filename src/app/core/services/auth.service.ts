import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserInterface } from '../models/user';
import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {

  }

  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
        .then(userData => {
          resolve(userData),
            this.updateUserData(userData.user);
        }).catch(err => console.log(reject(err)));
    });
  }

  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }

  logoutUser() {
    return this.afsAuth.auth.signOut();
  }

  public getUser(): Observable < UserInterface > {
    return new Observable((observer) => {
      this.afsAuth.authState.subscribe(userAuth => {
        if (!userAuth) {
         this.router.navigate([''])
        } else {
          this.isUserAdmin(userAuth.uid).subscribe(user => {
            observer.next(user);
            observer.complete();

          })
        }
      });
    });
  }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument < any > = this.afs.doc(`users/${user.uid}`);
    const data: UserInterface = {
      id: user.uid,
      email: user.email,
      img_profile: 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg',
      roles: {
        editor: true
      }
    };
    return userRef.set(data, { merge: true });
  }


  isUserAdmin(userUid) {
    return this.afs.doc < UserInterface > (`users/${userUid}`).valueChanges();
  }



}
