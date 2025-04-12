import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  constructor() { }
  
  getEmail:string = "john@email.com";

  setEmail(email:any) {
    this.getEmail = email;
  }

  emittedEmail() : Observable<any>{ 
    const getEmail = this.getEmail;
    return of(getEmail);
  }

  emailExistObsv = new Observable((obs) => {
    setTimeout(() => {
      obs.next(true);
    }, 1000)
  })

}
