import { Component, OnInit } from '@angular/core';
//https://medium.com/codingthesmartway-com-blog/firebase-cloud-storage-with-angular-394566fd529

import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../core/services/auth.service';
import { UserInterface } from '../core/models/user';
import { Observable } from 'rxjs';
import { UsuarioService } from '../core/services/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UsuarioService]
})
export class ProfileComponent implements OnInit {

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  public user: UserInterface;
  downloadURL: Observable < string > ;
  uploadProgress: Observable < number > ;



  constructor(private afStorage: AngularFireStorage,
    private authService: AuthService,
    private afsAuth: AngularFireAuth,
    private userService: UsuarioService) {
    this.authService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {}

  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadProgress = this.task.percentageChanges();
    this.uploadProgress.subscribe(item => {
      if (item == 100) {
        this.ref.getDownloadURL().subscribe(url => {
          this.user.img_profile = url;
          this.userService.update(this.user, );

        });
      }
    });
  }

}
