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
  public error = '';
  ngOnInit() {}

  onLogin(): void {
    this.authService.loginEmailUser(this.email, this.password)
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => {
        if ('The email address is badly formatted.' == err.message) {
          this.error = 'EL correo es incorrecto';
        } else if ('The password is invalid or the user does not have a password.' == err.message) {
          this.error = 'La contraseña es invalida o el usuario no tiene una contraseña';
        } else
          this.error = err.message;

      });
  }


  onLogout() {
    this.authService.logoutUser();
  }
  onLoginRedirect(): void {
    this.router.navigate(['precios/lista']);
  }
}
