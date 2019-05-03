import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { UserInterface } from '../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-inner',
  templateUrl: './header-inner.component.html'
})

export class HeaderInnerComponent implements OnInit {

  public user: UserInterface;


  constructor(private authService:
    AuthService, private afsAuth: AngularFireAuth,
    private router: Router) {}

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  onLogout() {
    this.afsAuth.auth.signOut();
  }

}
