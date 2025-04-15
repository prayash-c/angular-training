import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userinfo } from '../api';

@Injectable({
  providedIn: 'root',
})
export class UserinfoService {
  constructor() {}

  getEmail: string = 'john@email.com';
  userdata: userinfo = {
    fullname: '',
    email: '',
  };

  setEmail(email: any) {
    this.getEmail = email;
  }

  emittedEmail = new Observable((signup) => {
    signup.next(this.getEmail);
  });

  emailExistObsv = new Observable((obs) => {
    setTimeout(() => {
      obs.next(true); // check api for email
    }, 1000);
  });
}
