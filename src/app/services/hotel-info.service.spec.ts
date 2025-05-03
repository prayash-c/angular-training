import { TestBed } from '@angular/core/testing';

import { HotelInfoService } from './hotel-info.service';

describe('HotelInfoService', () => {
  let service: HotelInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
