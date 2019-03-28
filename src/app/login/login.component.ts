import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService) {}
  public email = '';
  public password = '';
  public auth: any;

  public isError: boolean= false;
  ngOnInit() {

    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.auth= auth;
        console.log("entrooo");
        this.router.navigate(['/precios/lista']);
      }
    });


  }

  onLogin(): void {
    this.authService.loginEmailUser(this.email, this.password)
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => console.log('err', err.message));
  }


  onLogout() {
    this.authService.logoutUser();
  }
  onLoginRedirect(): void {
    this.router.navigate(['/precios/lista']);
  }
}
