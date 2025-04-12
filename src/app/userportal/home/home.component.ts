import { Component } from '@angular/core';
import { UserinfoService } from '../userinfo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private userInfoServie: UserinfoService,
    private router: Router
  ) {}

  // name = this.userInfoServie.userdata.fullname || this.userInfoServie.getEmail;
  // email = this.userInfoServie.userdata.email;

  name = localStorage.getItem('name');
  email = localStorage.getItem('email');

  logout() {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
