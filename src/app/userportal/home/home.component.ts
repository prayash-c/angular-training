import { Component, OnInit } from '@angular/core';
import { UserinfoService } from '../userinfo.service';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private userInfoServie: UserinfoService,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    // this.apiService.getUserInfo().subscribe({
    // })
  }

  name = localStorage.getItem('name');
  email = localStorage.getItem('email');

  logout() {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.clear();
    this.router.navigate(['login'], { replaceUrl: true });
  }
}
