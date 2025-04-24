import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserinfoService } from '../userportal/userinfo.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('accessToken');
  const expectedRoute = route.data['route']; // gets the data from route which is being activated

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
    router.navigate(['home'], { replaceUrl: true });
    return false;
  } else {
    if (expectedRoute === 'login') {
      return true;
    } else if (expectedRoute !== checkSession) {
      router.navigate(['login']);
      return false;
    } else {
      return true;
    }
  }
};
