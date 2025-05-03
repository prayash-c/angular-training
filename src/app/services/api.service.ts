import { Injectable } from '@angular/core';

import { emailValidate } from '../models/api';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Binary } from '@angular/compiler';
import { Form } from '@angular/forms';
import { throttleTime } from 'rxjs';
import { MeetingRoomSubmit } from '../models/meeting-room-submit.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // https://dev-api.stayeasyonline.com/stayeasyapi/v1/user/sendLoginOtp -> login
  // `https://dev-api.stayeasyonline.com/stayeasyapi/v1/user/validateLoginOtp` -> validateOtp
  // APP_ERROR_1005 -> go to register
  // https://dev-api.stayeasyonline.com/stayeasyapi/v1/user/generateOtp -> after register
  // https://dev-api.stayeasyonline.com/stayeasyapi/v1/upload
  // https://dev-api.stayeasyonline.com/stayeasyapi/v1/auth/refreshtoken
  // https://dev-api.stayeasyonline.com/stayeasyapi/v1/hotelreservation/reservation?hotelId=-1&page=0&status=0,1,2&size=50
  // https://dev-api.stayeasyonline.com/stayeasyapi/v1/meeting-room/submit -> submit meeting room order

  emailOtp(email: string) {
    return this.http.post(
      `https://dev-api.stayeasyonline.com/stayeasyapi/v1/user/sendLoginOtp`,
      { emailAddress: email }
    );
  }

  validateOtp(email: string, otp: string) {
    return this.http.post(
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
    profilePicUrl: string | null
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

  uploadFile(file: FormData) {
    return this.http.post(
      `https://dev-api.stayeasyonline.com/stayeasyapi/v1/upload`,
      file
    );
  }

  refreshToken(refreshToken: string) {
    return this.http.post(
      `https://dev-api.stayeasyonline.com/stayeasyapi/v1/auth/refreshtoken`,
      { refreshToken: refreshToken }
    );
  }

  getStays() {
    const params = new HttpParams()
      .set('hotelId', '-1')
      .set('page', '0')
      .set('status', '0,1,2')
      .set('size', '50');

    return this.http.get(
      `https://dev-api.stayeasyonline.com/stayeasyapi/v1/hotelreservation/reservation`,
      { params }
    );
  }

  getMeetingRooms(hotelId: string) {
    return this.http.get(
      `https://dev-api.stayeasyonline.com/stayeasyapi/v1/hotel/${hotelId}/meeting-rooms`
    );
  }

  submitMeetingOrder(reservationDetails: MeetingRoomSubmit) {
    return this.http.post(
      `https://dev-api.stayeasyonline.com/stayeasyapi/v1/meeting-room/submit`,
      {
        foodAndBeveragesOpted: reservationDetails?.foodAndBeveragesOpted,
        instructions: reservationDetails?.instructions,
        meetingRoomId: reservationDetails?.meetingRoomId,
        numberOfHoursBooked: reservationDetails?.numberOfHoursBooked,
        numberOfPeople: reservationDetails?.numberOfPeople,
        paymentType: reservationDetails?.paymentType,
        price: reservationDetails?.price,
        reservedTime: reservationDetails?.reservedTime,
        seatingArrangement: reservationDetails?.seatingArrangement,
        stayId: reservationDetails?.stayId,
      }
    );
  }
}
