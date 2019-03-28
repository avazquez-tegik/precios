import { Component, OnInit } from '@angular/core';
//https://medium.com/codingthesmartway-com-blog/firebase-cloud-storage-with-angular-394566fd529

import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  constructor(private afStorage: AngularFireStorage) {}

  ngOnInit() {}

  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
  }

}
