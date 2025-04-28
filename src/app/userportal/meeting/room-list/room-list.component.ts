import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeetingRoom } from 'src/app/models/meeting-room.model';
import { RoomFeaturess } from 'src/app/models/room-features.model';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit {
  meetingRoomList: MeetingRoom[] = [];
  roomFeatures: RoomFeaturess[] = [];
  currentIndex: any = null;

  constructor(private router: Router) {
    sessionStorage.clear();
  }

  ngOnInit(): void {
    this.getMeetingRoomList();
    this.getRoomFeatures();
  }

  getMeetingRoomList() {
    this.meetingRoomList = [
      {
        image: 'assets/panorama.jpg',
        title: 'Executive Boardroom',
        description:
          'Spacious room with video conferencing and whiteboard, ideal for executive meetings.' +
          'Spacious room with video conferencing and whiteboard, ideal for executive meetings.' +
          'Spacious room with video conferencing and whiteboard, ideal for executive meetings.',
        price: 120,
      },
      {
        image: 'assets/panorama.jpg',
        title: 'Creative Hub',
        description:
          'Vibrant room with bean bags, whiteboards, and smart screen – great for brainstorming sessions.',
        price: 90,
      },
      {
        image: 'assets/panorama.jpg',
        title: 'Compact Meeting Pod',
        description:
          'Cozy and soundproof pod for small team discussions or interviews.',
        price: 50,
      },
      {
        image: 'assets/panorama.jpg',
        title: 'Virtual Conference Suite',
        description:
          'Fully equipped with high-speed internet, webcams, and audio systems for online meetings.',
        price: 75,
      },
      {
        image: 'assets/panorama.jpg',
        title: 'Training Room A',
        description:
          'Designed for workshops and team training, includes projector and seating for 20.',
        price: 110,
      },
    ];
  }

  getRoomFeatures() {
    this.roomFeatures = [
      {
        title: 'Modern Boardroom',
        description:
          'Elegant setup perfect for formal meetings with large table and ergonomic chairs.',
        seating: ['Boardroom', 'U-Shape'],
        tvAvAvailable: true,
        image: 'assets/panorama.jpg',
      },
      {
        title: 'Collaborative Space',
        description:
          'Open layout designed for creative collaboration and group activities.',
        seating: ['Cluster Seating', 'Lounge Seating'],
        tvAvAvailable: true,
        image: 'assets/panorama.jpg',
      },
      {
        title: 'Training Hall',
        description:
          'Spacious area suitable for workshops, training sessions, and seminars.',
        seating: ['Classroom', 'Theater'],
        tvAvAvailable: true,
        image: 'assets/panorama.jpg',
      },
      {
        title: 'Private Interview Room',
        description:
          'Quiet, small room ideal for interviews and one-on-one discussions.',
        seating: ['Across-the-table'],
        tvAvAvailable: false,
        image: 'assets/panorama.jpg',
      },
      {
        title: 'Event Hall',
        description:
          'Large hall designed for corporate events and presentations with stage access.',
        seating: ['Theater', 'Banquet'],
        tvAvAvailable: true,
        image: 'assets/panorama.jpg',
      },
    ];
  }

  reservation() {
    sessionStorage.setItem('session', 'room-reservation');
    this.router.navigate(['room-reservation']);
  }
}
