import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { UserInterface } from '../models/user';

@Component({
  selector: 'app-header-inner',
  templateUrl: './header-inner.component.html'
})

export class HeaderInnerComponent implements OnInit {

  public user: UserInterface  ;


  constructor(private authService: AuthService, private afsAuth: AngularFireAuth) {}

  ngOnInit() {
    this.afsAuth.authState.subscribe(userAuth => {
      this.authService.isUserAdmin(userAuth.uid).subscribe(user=>{
      	this.user=user;
      	console.log(this.user);

      })
    });
  }

  onLogout() {
    this.afsAuth.auth.signOut();
  }

}
