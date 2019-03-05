import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-header-inner',
  templateUrl: './header-inner.component.html'
})

export class HeaderInnerComponent implements OnInit {


constructor(private authService: AuthService, private afsAuth: AngularFireAuth) { }

ngOnInit() {
}

onLogout() {
  this.afsAuth.auth.signOut();
}

}
