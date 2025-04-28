import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss'],
})
export class MeetingComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {}

  navigate() {
    if (sessionStorage.getItem('session') === 'room-reservation') {
      this.router.navigateByUrl('meeting');
    } else {
      this.router.navigate(['home']);
    }
  }
}
