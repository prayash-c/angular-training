import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeetingRoom } from 'src/app/models/meeting-room.model';
import { RoomFeaturess } from 'src/app/models/room-features.model';
import { ApiService } from 'src/app/services/api.service';
import { HotelInfoService } from 'src/app/services/hotel-info.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit {
  meetingRoomList: MeetingRoom[] = [];
  roomFeatures: RoomFeaturess[] = [];
  currentIndex: any = null;
  hotelId: string | null = '';

  constructor(
    private router: Router,
    private apiService: ApiService,
    private hotelInfoService: HotelInfoService
  ) {
    sessionStorage.clear();
  }

  ngOnInit(): void {
    this.hotelId = localStorage.getItem('hotelId');
    this.getMeetingRoomList();
    this.getRoomFeatures();
  }

  getMeetingRoomList() {
    this.apiService.getMeetingRooms(String(this.hotelId)).subscribe({
      next: (res: any) => {
        this.meetingRoomList = res;
      },
      error: (err: any) => {
        console.log('failed to fetch meeting room details');
      },
    });
  }

  getRoomFeatures() {
    this.roomFeatures = [];
  }

  bookMeetingRoom(meetingRoom: MeetingRoom) {
    sessionStorage.setItem('session', 'room-reservation');
    this.router.navigateByUrl('meeting/room-reservation');
    this.hotelInfoService.setSelectedMeetingRoom(meetingRoom);
  }

  navigate() {
    if (sessionStorage.getItem('session') === 'room-reservation') {
      this.router.navigateByUrl('meeting');
    } else {
      this.router.navigate(['home']);
    }
  }
}
