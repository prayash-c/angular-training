import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userinfo } from '../api';
import { AuthServiceService } from '../auth/auth-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserinfoService {
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

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

  // canActivate(): boolean {
  //   if (this.authService.isLoggedIn()) {
  //     return true;
  //   }
  //   return false;
  // }
}
