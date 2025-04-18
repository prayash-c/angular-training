import { Injectable } from '@angular/core';

import { emailValidate } from '../api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // https://dev-api.stayeasyonline.com/stayeasyapi/v1/user/sendLoginOtp -> login
  // `https://dev-api.stayeasyonline.com/stayeasyapi/v1/user/validateLoginOtp` -> validateOtp
  // APP_ERROR_1005 -> go to register
  // https://dev-api.stayeasyonline.com/stayeasyapi/v1/user/generateOtp -> after register

  emailOtp(email: string) {
    return this.http.post<emailValidate>(
      `https://dev-api.stayeasyonline.com/stayeasyapi/v1/user/sendLoginOtp`,
      { emailAddress: email }
    );
  }

  validateOtp(email: string, otp: string) {
    return this.http.post<emailValidate>(
      `https://dev-api.stayeasyonline.com/stayeasyapi/v1/user/validateLoginOtp`,
      { emailAddress: email, otp: otp }
    );
  }

  registerOtp(
    contactNumber: string,
    email: string,
    fullName: string,
    hotelId: string
  ) {
    return this.http.post<emailValidate>(
      `https://dev-api.stayeasyonline.com/stayeasyapi/v1/user/generateOtp`,
      {
        contactNumber: contactNumber,
        email: email,
        fullName: fullName,
        hotelId: hotelId,
      }
    );
  }

  getUserDetails() {
    return this.http.get(
      `https://dev-api.stayeasyonline.com/stayeasyapi/v1/user/details`
    );
  }

  updateUserDetails(
    aboutMe: string,
    contact: string,
    email: string,
    id: number,
    name: string,
    profilePicUrl: string
  ) {
    return this.http.put(
      `https://dev-api.stayeasyonline.com/stayeasyapi/v1/user/update`,
      {
        aboutMe: aboutMe,
        contact: contact,
        email: email,
        id: id,
        name: name,
        profilePicUrl: profilePicUrl,
      }
    );
  }
  // https://dev-api.stayeasyonline.com/stayeasyapi/v1/upload
}
