import { Component, OnInit } from '@angular/core';
import { MeetingComponent } from '../meeting.component';
import { MeetingRoomService } from 'src/app/services/meeting-room.service';
import { MeetingRoomSubmit } from 'src/app/models/meeting-room-submit.model';
import { Router } from '@angular/router';
import { CommonToastr } from 'src/app/toastr/common.toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-room-order-summary',
  templateUrl: './room-order-summary.component.html',
  styleUrls: ['./room-order-summary.component.scss'],
})
export class RoomOrderSummaryComponent implements OnInit {
  cancelPolicyCheck: boolean = false;
  billCollapse: boolean = false;
  cancellationPolicy: string | null = null;
  basePrice: number | null = null;
  selectedDay: number | null = null;
  time: string | null = null;
  seat: string | null = null;

  reservationDetails: MeetingRoomSubmit = {
    foodAndBeveragesOpted: false,
    instructions: '',
    meetingRoomId: null,
    numberOfHoursBooked: null,
    numberOfPeople: null,
    paymentType: '',
    price: null,
    reservedTime: '',
    seatingArrangement: '',
    stayId: null,
  };

  constructor(
    private meetingRoomService: MeetingRoomService,
    private router: Router,
    private commontostr: CommonToastr,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.getReservationDetails();
    this.cancellationPolicy = localStorage.getItem('cancellationPolicy');
  }

  getReservationDetails() {
    if (this.meetingRoomService.getReservationDetails) {
      this.reservationDetails = this.meetingRoomService.getReservationDetails;
      this.cancellationPolicy = this.meetingRoomService.cancellationPolicy;
      this.basePrice = this.meetingRoomService.basePrice;
      this.selectedDay = this.meetingRoomService.selectedDay;
      this.time = this.meetingRoomService.time;
      this.seat = this.meetingRoomService.seat;
    } else {
      // this.navigate();
    }
  }

  revertDetails() {
    this.meetingRoomService.setRevertDetails(
      this.reservationDetails,
      this.selectedDay,
      this.time,
      this.seat
    );
  }

  onCancelPolicyToggle() {
    this.cancelPolicyCheck = !this.cancelPolicyCheck;
  }

  billSummary() {
    this.billCollapse = !this.billCollapse;
  }

  navigate() {
    this.revertDetails();
    this.router.navigateByUrl('meeting/room-reservation');
  }

  submit() {
    if (!this.cancelPolicyCheck) {
      this.commontostr.toastrError('Please agree to our cancellation policy');
    } else {
      this.apiService.submitMeetingOrder(this.reservationDetails).subscribe({
        next: (res: any) => {
          if (res) {
            this.commontostr.toastrSuccess('Success');
            this.router.navigateByUrl('meeting');
          }
        },
        error: (err: any) => {
          console.log('error occured when booking meeting room', err);
          this.commontostr.toastrError('Booking failed please try again later');
        },
      });
    }
  }
}
