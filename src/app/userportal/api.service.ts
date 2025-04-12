import { Injectable } from '@angular/core';

import { emailValidate } from '../api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // https://dev-api.stayeasyonline.com/stayeasyapi/v1/user/sendLoginOtp

  emailOtp(payload: string) {
    return this.http.post<emailValidate>(
      `https://dev-api.stayeasyonline.com/stayeasyapi/v1/user/sendLoginOtp`,
      payload
    );
  }
}
