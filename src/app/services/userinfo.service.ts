import { Injectable, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth/auth-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserinfoService {
  constructor(private router: Router) {}

  getEmail: string = '';

  setEmail(email: any) {
    this.getEmail = email;
  }

  checkReload() {
    const isRefreshed = sessionStorage.getItem('reload'); // session to detect page refresh
    if (isRefreshed === 'true') {
      this.router.navigate(['login'], { replaceUrl: true });
    } else {
      sessionStorage.setItem('reload', 'true');
    }
  }
}
