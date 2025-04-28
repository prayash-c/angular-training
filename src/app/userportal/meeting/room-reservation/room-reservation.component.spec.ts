import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomReservationComponent } from './room-reservation.component';

describe('RoomReservationComponent', () => {
  let component: RoomReservationComponent;
  let fixture: ComponentFixture<RoomReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomReservationComponent]
    });
    fixture = TestBed.createComponent(RoomReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
