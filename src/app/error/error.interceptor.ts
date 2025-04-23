import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  catchError,
  Observable,
  switchMap,
  throttleTime,
  throwError,
} from 'rxjs';

import { ApiService } from '../userportal/api.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private apiService: ApiService, private router: Router) {}
  private token = localStorage.getItem('accessToken');
  private refreshToken = String(localStorage.getItem('refreshToken'));

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      // use pipe for rxjs operators
      catchError((error) => {
        if (
          error.status === 401 &&
          request.url !=
            `https://dev-api.stayeasyonline.com/stayeasyapi/v1/auth/refreshtoken`
        ) {
          return this.apiService.refreshToken(this.refreshToken).pipe(
            throttleTime(5000), // Prevent multiple refresh calls within 5 seconds
            switchMap((res: any) => {
              if (res.accessToken && res.refreshToken) {
                localStorage.setItem('accessToken', res.accessToken);
                localStorage.setItem('refreshToken', res.refreshToken);
              }

              request = request.clone({
                setHeaders: { Authorization: `Bearer ${res.accessToken}` },
              });

              return next.handle(request);
            }),
            catchError((error) => {
              console.log('error getting user information', error);
              localStorage.clear();
              sessionStorage.clear();
              this.router.navigate(['login']);
              return throwError(() => error);
            })
          );
        } else {
          localStorage.clear();
          sessionStorage.clear();
          this.router.navigate(['login']);
          return throwError(() => error);
        }
      })
    );
  }
}
