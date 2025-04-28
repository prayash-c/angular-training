import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonToastr } from 'src/app/toastr/common.toastr';

@Component({
  selector: 'app-room-reservation',
  templateUrl: './room-reservation.component.html',
  styleUrls: ['./room-reservation.component.scss'],
})
export class RoomReservationComponent implements OnInit {
  meetingForm: FormGroup;
  timeSlots: string[] = [];
  selectedTime: string = '';
  timeOptionClick: boolean = false;

  seatingSlots: string[] = [];
  selectedSeat: string = '';
  seatOptionClick: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private commonToastr: CommonToastr
  ) {
    this.meetingForm = this.fb.group({
      noOfPeople: ['', [Validators.required]],
      noOfHours: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      seating: ['', [Validators.required]],
      instructions: [''],
    });
  }

  ngOnInit(): void {
    this.generateTimeSlots('09:00', '18:00', 15);
    this.seatingArrangement();
  }

  seatingArrangement() {
    this.seatingSlots = [
      'Boardroom',
      'Conference Room',
      'Banquet Hall',
      'Training Room',
      'Breakout Room',
      'Ballroom',
      'Meeting Suite',
      'Auditorium',
      'Exhibition Hall',
      'Private Dining Room',
    ];
  }

  navigate() {
    this.router.navigate(['order-summary']);
  }

  generateTimeSlots(start: string, end: string, interval: number) {
    const startTime = this.convertToMinutes(start);
    const endTime = this.convertToMinutes(end);

    for (let minutes = startTime; minutes <= endTime; minutes += interval) {
      this.timeSlots.push(this.formatTime(minutes));
    }
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

  selectedTimeFn(time: string) {
    this.selectedTime = time;
    this.meetingForm.patchValue({
      startTime: this.selectedTime,
    });
  }

  selectTimeOption() {
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

  onSubmit() {
    if (this.meetingForm.get('noOfPeople')?.invalid) {
      this.commonToastr.toastrError('Invalid number of people');
    } else if (this.meetingForm.get('noOfHours')?.invalid) {
      this.commonToastr.toastrError(
        'Number of hours should be a valid number less than 25'
      );
    } else if (this.meetingForm.get('startTime')?.invalid) {
      this.commonToastr.toastrError('Please select a start time');
    } else if (this.meetingForm.get('seating')?.invalid) {
      this.commonToastr.toastrError('Please select seating arrangement');
    }
  }
}
