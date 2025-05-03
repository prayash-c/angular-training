import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MeetingRoom } from '../models/meeting-room.model';

@Injectable({
  providedIn: 'root',
})
export class HotelInfoService {
  constructor() {}

  selectedMeetingRoom: MeetingRoom | null = null;

  setSelectedMeetingRoom(meetingRoom: MeetingRoom) {
    this.selectedMeetingRoom = meetingRoom;
  }
}
