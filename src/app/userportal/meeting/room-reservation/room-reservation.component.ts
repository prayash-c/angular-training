import { NumberFormatStyle } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MeetingRoomSubmit } from 'src/app/models/meeting-room-submit.model';
import { MeetingRoom } from 'src/app/models/meeting-room.model';
import { ApiService } from 'src/app/services/api.service';
import { HotelInfoService } from 'src/app/services/hotel-info.service';
import { MeetingRoomService } from 'src/app/services/meeting-room.service';
import { CommonToastr } from 'src/app/toastr/common.toastr';

@Component({
  selector: 'app-room-reservation',
  templateUrl: './room-reservation.component.html',
  styleUrls: ['./room-reservation.component.scss'],
})
export class RoomReservationComponent implements OnInit {
  meetingForm: FormGroup;
  roomSize: number | null = null;

  timeSlots: string[] = [];
  selectedTime: string = '';
  timeOptionClick: boolean = false;

  seatingSlots: string[] = [];
  selectedSeat: string = '';
  seatOptionClick: boolean = false;

  stayId: number | null = null;
  selectedMeetingRoom: number = 0;

  fullDate: string[] = [];
  days: string[] = [];
  date: number[] = [];
  // TODO: make array of object for these
  daysRem: number = 0;

  selectedDay: number | null = null;

  operateTime: string[][] = [];
  startOperateTime: string = '';
  endOperateTime: string = '';
  showOperateTime: string | null = null;

  meetingRoomList: MeetingRoom = {
    id: 0,
    meetingRoomImages: [],
    name: '',
    directionAndLocation: '',
    description: '',
    supportedSeatingArrangement: '',
    basePricePerHour: 0,
    operationalTiming: '',
    supportedPaymentModes: '',
    cancellationPolicy: '',
    tvAvailble: '',
    size: 0,
  };

  revertedReservationDetails: MeetingRoomSubmit | null = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private commonToastr: CommonToastr,
    private apiService: ApiService,
    private hotelInfoService: HotelInfoService,
    private meetingRoomService: MeetingRoomService
  ) {
    this.meetingForm = this.fb.group({
      noOfPeople: ['', [Validators.required]],
      noOfHours: ['', [Validators.required]],
      reservedTime: ['', [Validators.required]],
      seating: [{ value: '', disabled: true }, [Validators.required]],
      instructions: [''],
    });
  }

  ngOnInit(): void {
    this.stayId = parseInt(localStorage.getItem('stayId') || '');
    this.getSelectedMeetRoom();
    this.revertedDetails();
  }

  getSelectedMeetRoom() {
    if (this.hotelInfoService.selectedMeetingRoom) {
      this.meetingRoomList = this.hotelInfoService.selectedMeetingRoom;
      this.dateParser();
      this.defaultOperateTime();
      this.roomSize = this.meetingRoomList.size;
      localStorage.setItem(
        'cancellationPolicy',
        this.meetingRoomList.cancellationPolicy
      );
    } else {
      this.router.navigate(['meeting']);
    }
  }

  revertedDetails() {
    if (this.meetingRoomService?.getReservationDetails) {
      this.revertedReservationDetails =
        this.meetingRoomService?.getReservationDetails;
      this.selectedDay = this.meetingRoomService?.selectedDay;
      this.meetingForm.patchValue({
        noOfPeople: this.revertedReservationDetails.numberOfPeople,
        noOfHours: this.revertedReservationDetails.numberOfHoursBooked,
        instructions: this.revertedReservationDetails.instructions,
      });
      if (
        this.selectedDay !== null &&
        this.meetingRoomService.time &&
        this.meetingRoomService.seat
      ) {
        this.bookedDay(this.selectedDay);
        this.selectedTimeFn(this.meetingRoomService.time);
        this.selectedSeatFn(this.meetingRoomService.seat);
      } else {
        this.router.navigate(['meeting']);
      }
    } else {
      return;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('i, input[placeholder="Expected Start Time"]')) {
      this.timeOptionClick = false;
    }
    if (
      !target.closest('i, input[placeholder="Select the seating arrangement"]')
    ) {
      this.seatOptionClick = false;
    }
  }

  dateParser() {
    const stay = localStorage.getItem('selectedStay');
    if (stay) {
      const hotel = JSON.parse(stay);
      this.daysRem = this.dateDiff(hotel.checkInDate, hotel.checkOutDate);
      for (let i = 0; i < this.daysRem; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);

        const dayOfMonth = date.getDate();
        const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
        this.fullDate.push(date.toISOString());
        this.date.push(dayOfMonth);
        this.days.push(weekday.toUpperCase());
      }
    }
  }

  dateDiff(checkIn: string, checkOut: string): number {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const now = new Date();
    const diffMs = checkOutDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    return diffDays;
  }

  convertToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  formatTime(minutes: number): string {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hrs >= 12 ? 'PM' : 'AM';
    const formattedHours = hrs % 12 === 0 ? 12 : hrs % 12;
    const formattedMinutes = mins.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${period}`;
  }

  defaultOperateTime() {
    const operateTime = this.meetingRoomList.operationalTiming
      .split(',')
      .map((item) => {
        const [day, timeRange] = item.split(' ');
        const [startTime, endTime] = timeRange.split('-');
        return [day, startTime, endTime];
      });
    operateTime.map((arr) => {
      this.operateTime.push(arr);
    });
  }

  bookedDay(index: number) {
    this.selectedTime = '';
    this.selectedDay = index;
    this.meetingForm.get('seating')?.enable();
    // console.log(this.days[index], this.date[index]);

    const checkTime = this.operateTime.find((day) =>
      day.includes(this.days[index])
    );
    if (checkTime) {
      this.startOperateTime = checkTime[1];
      this.endOperateTime = checkTime[2];
      this.showOperateTime = `${this.formatTime(
        this.convertToMinutes(checkTime[1])
      )} to ${this.formatTime(this.convertToMinutes(checkTime[2]))}`;
      this.generateTimeSlots(this.startOperateTime, this.endOperateTime, 15);
    }
    // console.log(this.operateTime);
  }

  generateTimeSlots(start: string, end: string, interval: number) {
    let startTime = 0;
    let timeNow = 0;
    const now = new Date();
    now.getMinutes() > 30
      ? (timeNow = now.getHours() + 1)
      : (timeNow = now.getHours() + 0.5);

    if (this.selectedDay !== null) {
      if (now.getDate() === this.date[this.selectedDay]) {
        startTime = this.convertToMinutes(`${timeNow}:00`);
      } else {
        startTime = this.convertToMinutes(start);
      }
    }
    const endTime = this.convertToMinutes(end);
    this.timeSlots = [];

    for (let minutes = startTime; minutes <= endTime; minutes += interval) {
      this.timeSlots.push(this.formatTime(minutes));
    }
  }

  updateIsoTime(isoDate: string, time12h: string): string {
    const date = new Date(isoDate);

    const [timePart, modifier] = time12h.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);

    if (modifier === 'PM' && hours < 12) {
      hours += 12;
    }
    if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date.toISOString();
  }

  selectedTimeFn(time: string) {
    this.selectedTime = time;
    if (this.selectedDay) {
      this.meetingForm.patchValue({
        reservedTime: this.updateIsoTime(this.fullDate[this.selectedDay], time),
      });
    }
  }

  selectTimeOption() {
    if (this.selectedDay === null) {
      return;
    }
    this.timeOptionClick = !this.timeOptionClick;
  }

  selectedSeatFn(seat: string) {
    this.selectedSeat = seat;
    this.meetingForm.patchValue({
      seating: this.selectedSeat,
    });
  }

  selectSeatingOption() {
    this.seatOptionClick = !this.seatOptionClick;
  }

  submitOrder() {
    if (
      this.meetingRoomList.id &&
      this.meetingForm.get('noOfHours')?.value &&
      this.stayId !== null &&
      this.selectedDay !== null
    ) {
      const price =
        this.meetingRoomList.basePricePerHour *
        parseInt(this.meetingForm.get('noOfHours')?.value);

      this.meetingRoomService.setMeetingRoomReservation(
        this.meetingForm.get('instructions')?.value,
        this.meetingRoomList.id,
        this.meetingForm.get('noOfHours')?.value,
        this.meetingForm.get('noOfPeople')?.value,
        price,
        this.meetingForm.get('reservedTime')?.value,
        this.meetingForm.get('seating')?.value,
        this.stayId
      );

      this.meetingRoomService.otherInfo(
        this.meetingRoomList.cancellationPolicy,
        this.meetingRoomList.basePricePerHour,
        this.selectedDay,
        this.selectedTime,
        this.selectedSeat
      );
    } else {
      console.log('Failed to place order!');
      this.commonToastr.toastrError('Failed to place order');
    }
  }

  navigate() {
    this.router.navigate(['meeting']);
  }

  onSubmit() {
    console.log(this.meetingForm);
    if (
      this.roomSize &&
      (this.meetingForm.get('noOfPeople')?.invalid ||
        this.meetingForm.get('noOfPeople')?.value > this.roomSize)
    ) {
      this.commonToastr.toastrError('Invalid number of people');
    } else if (
      this.meetingForm.get('noOfHours')?.invalid ||
      this.meetingForm.get('noOfHours')?.value > 25
    ) {
      this.commonToastr.toastrError(
        'Number of hours should be a valid number less than 25'
      );
    } else if (this.meetingForm.get('reservedTime')?.invalid) {
      this.commonToastr.toastrError('Please select a start time');
    } else if (this.meetingForm.get('seating')?.invalid) {
      this.commonToastr.toastrError('Please select seating arrangement');
    } else {
      this.submitOrder();
      this.router.navigateByUrl('meeting/room-order-summary');
    }
  }
}
