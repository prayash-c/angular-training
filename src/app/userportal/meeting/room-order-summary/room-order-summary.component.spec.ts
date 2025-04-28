import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomOrderSummaryComponent } from './room-order-summary.component';

describe('RoomOrderSummaryComponent', () => {
  let component: RoomOrderSummaryComponent;
  let fixture: ComponentFixture<RoomOrderSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomOrderSummaryComponent]
    });
    fixture = TestBed.createComponent(RoomOrderSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
