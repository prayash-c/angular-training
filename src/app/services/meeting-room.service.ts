import { Injectable } from '@angular/core';
import { MeetingRoomSubmit } from '../models/meeting-room-submit.model';

@Injectable({
  providedIn: 'root',
})
export class MeetingRoomService {
  getReservationDetails: MeetingRoomSubmit | null = null;

  cancellationPolicy: string | null = null;
  basePrice: number | null = null;
  selectedDay: number | null = null;
  time: string | null = null;
  seat: string | null = null;

  private reservationDetails: MeetingRoomSubmit = {
    foodAndBeveragesOpted: false,
    instructions: '',
    meetingRoomId: null,
    numberOfHoursBooked: null,
    numberOfPeople: null,
    paymentType: 'BILL_TO_ROOM',
    price: null,
    reservedTime: '',
    seatingArrangement: '',
    stayId: null,
  };

  constructor() {}

  setMeetingRoomReservation(
    instructions: string,
    meetingRoomId: number,
    numberOfHoursBooked: number,
    numberOfPeople: number,
    price: number,
    reservedTime: string,
    seatingArrangement: string,
    stayId: number
  ) {
    this.reservationDetails.instructions = instructions;
    this.reservationDetails.meetingRoomId = meetingRoomId;
    this.reservationDetails.numberOfHoursBooked = numberOfHoursBooked;
    this.reservationDetails.numberOfPeople = numberOfPeople;
    this.reservationDetails.price = price;
    this.reservationDetails.reservedTime = reservedTime;
    this.reservationDetails.seatingArrangement = seatingArrangement;
    this.reservationDetails.stayId = stayId;
    this.getReservationDetails = this.reservationDetails;
  }

  otherInfo(
    cancellationPolicy: string,
    basePricePerHour: number,
    selectedDay: number | null,
    time: string | null,
    seat: string | null
  ) {
    this.cancellationPolicy = cancellationPolicy;
    this.basePrice = basePricePerHour;
    this.selectedDay = selectedDay;
    this.time = time;
    this.seat = seat;
  }

  setRevertDetails(
    reservationDetails: MeetingRoomSubmit,
    selectedDay: number | null,
    time: string | null,
    seat: string | null
  ) {
    this.getReservationDetails = reservationDetails;
    this.selectedDay = selectedDay;
    this.time = time;
    this.seat = seat;
  }
}
