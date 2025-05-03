import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserinfoService } from '../services/userinfo.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userInfoService = inject(UserinfoService);
  const token = localStorage.getItem('accessToken');
  const expectedRoute = route.data['route']; // gets the data from route which is being activated
  const email = userInfoService.getEmail;

  let checkSession =
    sessionStorage.getItem('otpSession') ||
    sessionStorage.getItem('signupSession');

  // let updateSession = sessionStorage.getItem('session');

  if (token) {
    if (expectedRoute === 'home') {
      return true;
    }
    if (expectedRoute === 'edit') {
      return true;
      // if (expectedRoute === updateSession) {
      //   return true;
      // } else {
      //   router.navigate(['home'], { replaceUrl: true });
      //   return false;
      // }
    }
    if (expectedRoute === 'meeting') {
      return true;
    }
    router.navigate(['home'], { replaceUrl: true });
    return false;
  } else {
    if (expectedRoute === 'login' || String(checkSession)) {
      return true;
    } else {
      router.navigate(['login']);
      return false;
    }
  }
};
